/* ============================================================
   MNTN — main.js
   Fullpage section manager + 3D parallax + particles + tilt
   ============================================================ */

'use strict';

/* ── tiny helpers ── */
const $  = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const lerp  = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

/* ================================================================
   SECTION LABELS (shown in side-dots)
   ================================================================ */
const LABELS = ['Start', 'Get Started', 'Hiking Gear', 'Map & Timing', 'More'];

/* ================================================================
   1.  FULLPAGE SECTION MANAGER
   ================================================================ */
class SectionManager {
  constructor() {
    this.sections = $$('.page-section');
    this.total    = this.sections.length;
    this.current  = 0;
    this.locked   = false;
    this.LOCK     = 1050; // slightly > CSS transition duration

    this.curtain   = $('#curtain');
    this.dots      = $$('.dot');
    this.label     = $('#sideLabel');
    this.counterEl = $('#counterCur');

    this._bindEvents();
    this._updateUI(0);
  }

  /* ── Navigate to section index ── */
  go(idx, instant = false) {
    if (this.locked && !instant) return;
    idx = clamp(idx, 0, this.total - 1);
    if (idx === this.current && !instant) return;

    const dir  = idx > this.current ? 1 : -1;
    const prev = this.current;
    const next = idx;

    this.locked = true;

    const prevEl = this.sections[prev];
    const nextEl = this.sections[next];

    /* Freeze nav active state on dots instantly */
    this._updateUI(next);

    /* Animate out previous */
    prevEl.classList.remove('is-active');
    prevEl.classList.add(dir > 0 ? 'is-above' : 'is-below');

    /* Animate in next (prep it on the correct side first) */
    nextEl.classList.remove('is-above', 'is-below');
    nextEl.classList.add('is-active');

    this.current = next;

    /* Trigger content reveal for the newly-active section */
    this._revealSection(nextEl);

    /* After animation: sort all sections, release lock */
    setTimeout(() => {
      this.sections.forEach((s, i) => {
        if (i === this.current) return;
        s.classList.remove('is-above', 'is-below', 'is-active');
        s.classList.add(i < this.current ? 'is-above' : 'is-below');
      });
      this.locked = false;
    }, this.LOCK);
  }

  next() { this.go(this.current + 1); }
  prev() { this.go(this.current - 1); }

  /* ── Reveal animated children ── */
  _revealSection(section) {
    /* Reset all f-r / h-r elements so they can animate in again */
    const els = section.querySelectorAll('.f-r, .h-r');
    els.forEach(el => {
      el.classList.remove('reveal');
      void el.offsetWidth; // force reflow
    });
    /* Stagger reveal — delay driven by --d CSS var */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        els.forEach(el => el.classList.add('reveal'));
      });
    });
  }

  /* ── Update dots, label, counter ── */
  _updateUI(idx) {
    this.dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    if (this.label)     this.label.textContent = LABELS[idx] ?? '';
    if (this.counterEl) this.counterEl.textContent = String(idx + 1).padStart(2, '0');

    /* Frosted nav on non-hero sections */
    $('#navbar').classList.toggle('frosted', idx > 0);
  }

  /* ── Events ── */
  _bindEvents() {
    /* Wheel — single-step per gesture */
    let wheelCooldown = false;
    window.addEventListener('wheel', e => {
      e.preventDefault();
      if (wheelCooldown) return;
      wheelCooldown = true;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.deltaY > 0 ? this.next() : this.prev();
      }
      setTimeout(() => { wheelCooldown = false; }, this.LOCK);
    }, { passive: false });

    /* Touch swipe */
    let touchY0 = 0;
    window.addEventListener('touchstart', e => { touchY0 = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchend',   e => {
      const dy = touchY0 - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 48) dy > 0 ? this.next() : this.prev();
    }, { passive: true });

    /* Keyboard */
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); this.next(); }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp'  ) { e.preventDefault(); this.prev(); }
    });

    /* Dot clicks */
    $$('[data-go]').forEach(el => {
      el.addEventListener('click', () => {
        const i = parseInt(el.dataset.go, 10);
        if (!isNaN(i)) this.go(i);
      });
    });

    /* Mobile burger */
    const burger   = $('#burger');
    const navLinks = $('#nav-links');
    burger?.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      navLinks.classList.toggle('open', open);
    });
    navLinks?.addEventListener('click', e => {
      if (e.target.tagName === 'A' || e.target.dataset.go) {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }
}

/* Init section manager */
const SM = new SectionManager();

/* Trigger hero entrance on load */
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    SM._revealSection(SM.sections[0]);
  });
});

/* ================================================================
   2.  HERO MOUSE PARALLAX (layers shift on mouse move)
   ================================================================ */
const heroEl       = $('#s0');
const layerPhoto  = $('#layerPhoto');
const layerMtnFar = $('#layerMtnFar');
const layerMtnMid = $('#layerMtnMid');
const layerGrass  = $('#layerGrass');
const layerSky    = $('#layerSky');

/* Mouse position (-0.5 … +0.5) */
let mx = 0, my = 0;
let curMX = 0, curMY = 0;

heroEl?.addEventListener('mousemove', e => {
  const r = heroEl.getBoundingClientRect();
  mx = (e.clientX - r.left)  / r.width  - 0.5;
  my = (e.clientY - r.top)   / r.height - 0.5;
});

heroEl?.addEventListener('mouseleave', () => { mx = 0; my = 0; });

/* Layer depth multipliers [dx, dy]
   curMX/curMY ∈ [-0.5 … +0.5]  →  max shift = |f| * 0.5
   Каждый inset в CSS перекрывает этот сдвиг с запасом.         */
const LAYER_OFFSETS = [
  { el: layerSky,    fx: -10, fy: -4  },   // gradient, краёв нет
  { el: layerPhoto,  fx: -26, fy: -10 },   // max ±13px H / ±5px V
  { el: layerMtnFar, fx: -55, fy: -22 },   // max ±28px H / ±11px V
  { el: layerMtnMid, fx: -85, fy: -34 },   // max ±43px H / ±17px V
  { el: layerGrass,  fx: -130, fy: -54 },  // max ±65px H / ±27px V
];

function parallaxTick() {
  curMX = lerp(curMX, mx, 0.09);   // чуть отзывчивее
  curMY = lerp(curMY, my, 0.09);

  LAYER_OFFSETS.forEach(({ el, fx, fy }) => {
    if (!el) return;
    el.style.transform = `translate3d(${curMX * fx}px, ${curMY * fy}px, 0)`;
  });

  requestAnimationFrame(parallaxTick);
}
parallaxTick();

/* ================================================================
   3.  CANVAS PARTICLE SYSTEM — fog + dust
   ================================================================ */
const canvas = $('#heroCanvas');
const ctx    = canvas?.getContext('2d');

let W = 0, H = 0;
let particles = [];

function resizeCanvas() {
  if (!canvas) return;
  W = canvas.width  = heroEl.offsetWidth;
  H = canvas.height = heroEl.offsetHeight;
}

class Particle {
  constructor(init = false) {
    this.reset(init);
  }
  reset(init = false) {
    this.x     = Math.random() * W;
    this.y     = init ? Math.random() * H : H + 10;
    this.fog   = Math.random() < 0.28;
    this.r     = this.fog ? Math.random() * 70 + 30  : Math.random() * 1.8 + 0.4;
    this.speed = this.fog ? Math.random() * 0.12 + 0.04 : Math.random() * 0.35 + 0.08;
    this.drift = (Math.random() - 0.5) * (this.fog ? 0.55 : 0.25);
    this.alpha = this.fog ? Math.random() * 0.045 + 0.008 : Math.random() * 0.45 + 0.06;
    this.phase = Math.random() * Math.PI * 2;
    this.phaseSpd = Math.random() * 0.015 + 0.004;
  }
  update() {
    this.y -= this.speed;
    this.x += this.drift;
    this.phase += this.phaseSpd;
    if (this.y + this.r < 0) this.reset();
  }
  draw() {
    const a = this.alpha * (0.6 + 0.4 * Math.sin(this.phase));
    if (this.fog) {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      g.addColorStop(0, `rgba(140,190,220,${a})`);
      g.addColorStop(1, 'rgba(140,190,220,0)');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(215,232,245,${a})`;
      ctx.fill();
    }
  }
}

function initParticles() {
  resizeCanvas();
  particles = Array.from({ length: 130 }, () => new Particle(true));
}

function drawParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  particles.forEach(p => { p.x = Math.random() * W; });
}, { passive: true });

initParticles();
drawParticles();

/* ================================================================
   4.  3D CARD TILT — feature images
   ================================================================ */
$$('.img-3d-wrap').forEach(card => {
  let raf;
  let rX = 0, rY = 0, tX = 0, tY = 0;

  function tick() {
    rX = lerp(rX, tX, 0.09);
    rY = lerp(rY, tY, 0.09);
    card.style.transform = `perspective(800px) rotateX(${rX}deg) rotateY(${rY}deg)`;

    const glare = card.querySelector('.img-glare');
    if (glare) {
      glare.style.background = `linear-gradient(
        ${135 + rY * 2}deg,
        rgba(255,255,255,${0.04 + Math.abs(rY) * 0.012}) 0%,
        transparent 50%,
        rgba(0,0,0,${0.14 + Math.abs(rX) * 0.012}) 100%
      )`;
    }
    raf = requestAnimationFrame(tick);
  }

  card.addEventListener('mouseenter', () => { cancelAnimationFrame(raf); tick(); });
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    tX = -((e.clientY - r.top)  / r.height - 0.5) * 15;
    tY =  ((e.clientX - r.left) / r.width  - 0.5) * 15;
  });
  card.addEventListener('mouseleave', () => {
    tX = 0; tY = 0;
    function snap() {
      rX = lerp(rX, 0, 0.07);
      rY = lerp(rY, 0, 0.07);
      card.style.transform = `perspective(800px) rotateX(${rX}deg) rotateY(${rY}deg)`;
      if (Math.abs(rX) > 0.01 || Math.abs(rY) > 0.01) raf = requestAnimationFrame(snap);
      else card.style.transform = '';
    }
    cancelAnimationFrame(raf);
    snap();
  });
});
