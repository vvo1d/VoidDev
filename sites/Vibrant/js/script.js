/* ═══════════════════════════════════════════════════════════
   script.js — Vibrant Landing Page
   All interactive behaviour + Parallax + Premium effects
════════════════════════════════════════════════════════════ */

/* ── UTILS ───────────────────────────────────────────────── */
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const isMobile = () => window.innerWidth <= 768;

/* ═══════════════════════════════════════════════════════════
   1. NAV SCROLL EFFECT
════════════════════════════════════════════════════════════ */
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ═══════════════════════════════════════════════════════════
   2. MOBILE HAMBURGER MENU
════════════════════════════════════════════════════════════ */
(function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  const close = () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();


/* ═══════════════════════════════════════════════════════════
   3. SCROLL REVEAL
════════════════════════════════════════════════════════════ */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach((el) => observer.observe(el));
})();


/* ═══════════════════════════════════════════════════════════
   4. STAGGER CARDS
════════════════════════════════════════════════════════════ */
(function initStagger() {
  document.querySelectorAll('.testi-card.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
  document.querySelectorAll('.feature-row.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.06) + 's';
  });
})();


/* ═══════════════════════════════════════════════════════════
   5. SMOOTH ANCHOR SCROLL
════════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 16, behavior: 'smooth' });
    });
  });
})();


/* ═══════════════════════════════════════════════════════════
   6. HERO PARALLAX — mesh blobs + dashboard card depth
════════════════════════════════════════════════════════════ */
(function initHeroParallax() {
  if (isMobile()) return;

  const heroBg   = document.querySelector('.hero-bg');
  const heroCard = document.querySelector('.dashboard-card');
  const heroContent = document.querySelector('.hero-content');
  if (!heroBg) return;

  let currentY = 0;
  let targetY  = 0;

  const onScroll = () => { targetY = window.scrollY; };
  window.addEventListener('scroll', onScroll, { passive: true });

  const tick = () => {
    currentY = lerp(currentY, targetY, 0.08);
    const sy = currentY;

    // blobs move at different rates for depth
    if (heroBg) {
      heroBg.style.transform = `translateY(${sy * 0.4}px)`;
    }
    // card moves slower — feels closer to viewer
    if (heroCard) {
      heroCard.style.transform = `translateY(${sy * 0.15}px)`;
    }
    // content drifts up slightly — classic parallax
    if (heroContent) {
      heroContent.style.transform = `translateY(${sy * 0.25}px)`;
    }

    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();


/* ═══════════════════════════════════════════════════════════
   7. MOUSE-TILT on hero dashboard card (3D perspective)
════════════════════════════════════════════════════════════ */
(function initCardTilt() {
  if (isMobile()) return;

  const card = document.querySelector('.dashboard-card');
  if (!card) return;

  const MAX_TILT = 8; // degrees
  let cx = 0, cy = 0, tx = 0, ty = 0, rafId = null;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    tx = clamp(( y / rect.height) * MAX_TILT * 2, -MAX_TILT, MAX_TILT);
    ty = clamp((-x / rect.width)  * MAX_TILT * 2, -MAX_TILT, MAX_TILT);
  });

  hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });

  const tiltTick = () => {
    cx = lerp(cx, tx, 0.08);
    cy = lerp(cy, ty, 0.08);
    card.style.transform = `perspective(1000px) rotateX(${cx}deg) rotateY(${cy}deg) translateY(0)`;
    rafId = requestAnimationFrame(tiltTick);
  };
  tiltTick();
})();


/* ═══════════════════════════════════════════════════════════
   8. SECTION PARALLAX — feature visuals shift on scroll
════════════════════════════════════════════════════════════ */
(function initSectionParallax() {
  if (isMobile()) return;

  const visuals = document.querySelectorAll('.feature-visual');
  if (!visuals.length) return;

  const onScroll = () => {
    visuals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      // progress: -1 (above viewport) → 0 (centre) → 1 (below)
      const progress = (winH / 2 - (rect.top + rect.height / 2)) / winH;
      el.style.transform = `translateY(${progress * 40}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ═══════════════════════════════════════════════════════════
   9. FLOATING ORBS BACKGROUND (canvas particle system)
════════════════════════════════════════════════════════════ */
(function initOrbCanvas() {
  const canvas = document.getElementById('orb-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H;

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = document.body.scrollHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['124,92,252', '56,189,248', '167,139,250', '74,222,128'];
  const COUNT  = isMobile() ? 10 : 20;

  const orbs = Array.from({ length: COUNT }, () => ({
    x:   Math.random() * window.innerWidth,
    y:   Math.random() * document.body.scrollHeight,
    r:   Math.random() * 180 + 80,
    dx:  (Math.random() - 0.5) * 0.3,
    dy:  (Math.random() - 0.5) * 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.04 + 0.015,
  }));

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    orbs.forEach(o => {
      o.x += o.dx;
      o.y += o.dy;
      if (o.x < -o.r) o.x = W + o.r;
      if (o.x > W + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = H + o.r;
      if (o.y > H + o.r) o.y = -o.r;

      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, `rgba(${o.color},${o.alpha})`);
      g.addColorStop(1, `rgba(${o.color},0)`);
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
})();


/* ═══════════════════════════════════════════════════════════
   10. MAGNETIC BUTTONS
════════════════════════════════════════════════════════════ */
(function initMagneticButtons() {
  if (isMobile()) return;

  document.querySelectorAll('.btn').forEach((btn) => {
    let bx = 0, by = 0, tbx = 0, tby = 0, rafId = null;
    const STRENGTH = 0.35;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      tbx = (e.clientX - rect.left - rect.width  / 2) * STRENGTH;
      tby = (e.clientY - rect.top  - rect.height / 2) * STRENGTH;
    });

    btn.addEventListener('mouseleave', () => { tbx = 0; tby = 0; });

    const magTick = () => {
      bx = lerp(bx, tbx, 0.12);
      by = lerp(by, tby, 0.12);
      btn.style.transform = `translate(${bx}px, ${by}px)`;
      rafId = requestAnimationFrame(magTick);
    };
    magTick();
  });
})();


/* ═══════════════════════════════════════════════════════════
   11. ANIMATED COUNTER — stat values in hero card
════════════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const fmt = (n, prefix, suffix) => {
    const s = n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${prefix}${s}${suffix}`;
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const dur    = 1800;
      const start  = performance.now();

      const step = (now) => {
        const t = clamp((now - start) / dur, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
        el.textContent = fmt(target * eased, prefix, suffix);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();


/* ═══════════════════════════════════════════════════════════
   12. CURSOR GLOW (custom trailing cursor)
════════════════════════════════════════════════════════════ */
(function initCursorGlow() {
  if (isMobile()) return;

  const cursor = document.getElementById('cursor-glow');
  if (!cursor) return;

  let mx = -200, my = -200, cx = -200, cy = -200;

  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

  const cursorTick = () => {
    cx = lerp(cx, mx, 0.1);
    cy = lerp(cy, my, 0.1);
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(cursorTick);
  };
  cursorTick();

  // Scale up on hoverable elements
  const hoverEls = document.querySelectorAll('a, button, .testi-card, .price-card, .feature-visual');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
})();


/* ═══════════════════════════════════════════════════════════
   13. PRICING TOGGLE — Monthly / Annual with animated price
════════════════════════════════════════════════════════════ */
(function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;

  const prices = document.querySelectorAll('[data-monthly][data-annual]');

  toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;
    document.querySelector('.pricing-period')?.classList.toggle('annual', isAnnual);

    prices.forEach(el => {
      const from = parseFloat(el.textContent);
      const to   = parseFloat(isAnnual ? el.dataset.annual : el.dataset.monthly);
      const dur  = 400;
      const start = performance.now();

      const step = (now) => {
        const t = clamp((now - start) / dur, 0, 1);
        const eased = 1 - Math.pow(1 - t, 2);
        el.textContent = lerp(from, to, eased).toFixed(2);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
})();


/* ═══════════════════════════════════════════════════════════
   14. TESTI CARDS — 3D tilt on hover
════════════════════════════════════════════════════════════ */
(function initTestiTilt() {
  if (isMobile()) return;

  document.querySelectorAll('.testi-card').forEach((card) => {
    const MAX = 6;
    let cx = 0, cy = 0, tx = 0, ty = 0;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      tx = clamp(((e.clientY - rect.top  - rect.height / 2) / rect.height) * MAX * 2, -MAX, MAX);
      ty = clamp(((-(e.clientX - rect.left - rect.width  / 2)) / rect.width) * MAX * 2, -MAX, MAX);
    });
    card.addEventListener('mouseleave', () => { tx = 0; ty = 0; });

    const tick = () => {
      cx = lerp(cx, tx, 0.1);
      cy = lerp(cy, ty, 0.1);
      card.style.transform = `perspective(600px) rotateX(${cx}deg) rotateY(${cy}deg) translateY(-4px)`;
      requestAnimationFrame(tick);
    };
    tick();
  });
})();


/* ═══════════════════════════════════════════════════════════
   15. SAVINGS PILL — live number ticker
════════════════════════════════════════════════════════════ */
(function initSavingsTicker() {
  const pill = document.querySelector('.savings-pill .amount');
  if (!pill) return;

  const base  = 2380;
  const speed = 0.003; // dollars per frame

  let val = base;
  const tick = () => {
    val += speed + Math.random() * 0.002;
    if (val > base + 12) val = base;
    pill.textContent = '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    requestAnimationFrame(tick);
  };
  tick();
})();