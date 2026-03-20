'use strict';
/* global L */

// =============================================
//  MOON RIVER — main.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── Language switcher ─────────────────────
  const langItems = document.querySelectorAll('.lang-switcher__item');
  langItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      langItems.forEach(el => el.classList.remove('lang-switcher__item--active'));
      item.classList.add('lang-switcher__item--active');
    });
  });

  // ─── Карта бутиков (Leaflet) ───────────────
  const mapEl = document.getElementById('boutiqueMap');
  if (mapEl && typeof L !== 'undefined') {

    const boutiqueMap = L.map('boutiqueMap', {
      center: [55.758, 37.617],
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    // Тёмные тайлы CartoDB Dark Matter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(boutiqueMap);

    // Кастомная иконка — белый круг SVG
    const pinIcon = (active = false) => L.divIcon({
      className: '',
      html: active
        ? `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
             <circle cx="16" cy="16" r="14" fill="white" fill-opacity="0.95"/>
             <circle cx="16" cy="16" r="5" fill="#1c1c1c"/>
             <line x1="16" y1="30" x2="16" y2="42" stroke="white" stroke-width="1.5"/>
           </svg>`
        : `<svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg">
             <circle cx="14" cy="14" r="12" stroke="white" stroke-width="1.5" fill="none"/>
             <line x1="14" y1="26" x2="14" y2="38" stroke="white" stroke-width="1.2"/>
           </svg>`,
      iconSize:   active ? [32, 42] : [28, 38],
      iconAnchor: active ? [16, 42] : [14, 38],
      popupAnchor:[0, -44],
    });

    // Локации бутиков
    const boutiques = [
      { coords: [55.7617, 37.6062], name: 'ул. Тверская, 24' },
      { coords: [55.7497, 37.5918], name: 'ул. Арбат, 10'    },
      { coords: [55.7430, 37.5608], name: 'Кутузовский пр-т, 15' },
      { coords: [55.7381, 37.5967], name: 'ул. Остоженка, 8' },
      { coords: [55.7394, 37.6530], name: 'Таганская пл., 1' },
    ];

    boutiques.forEach(({ coords, name }, i) => {
      const isFirst = i === 0;
      const marker = L.marker(coords, { icon: pinIcon(isFirst) }).addTo(boutiqueMap);

      if (isFirst) {
        marker.bindPopup(name, { closeButton: false, offset: [0, -4] }).openPopup();
      } else {
        marker.bindPopup(name, { closeButton: false, offset: [0, -4] });
      }

      marker.on('click', () => {
        // сброс всех иконок
        boutiqueMap.eachLayer(l => {
          if (l instanceof L.Marker) l.setIcon(pinIcon(false));
        });
        marker.setIcon(pinIcon(true));
      });
    });
  }

  // ─── Menu button ───────────────────────────
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      // TODO: open navigation drawer
    });
  }

  // ─── Ring animation ────────────────────────
  const ring = document.querySelector('.hero__image-wrap');
  if (!ring) return;

  // Брейкпоинт: на мобильном кольцо в потоке (position: static),
  // трансформации из JS не нужны и ломают CSS
  const mq = window.matchMedia('(min-width: 769px)');

  let floatAnimation = null;
  let rafId = null;
  let currentX = 0, currentY = 0;
  let targetX  = 0, targetY  = 0;

  // ── Инициализация анимации ──────────────────
  function initAnimation() {
    const isDesktop = mq.matches;

    // 1. Fade-in работает везде (только opacity, без transform на мобильном)
    if (isDesktop) {
      // Начальная позиция чуть ниже — для плавного подъёма
      ring.style.transform  = 'translate(-50%, -42%)';
      ring.style.transition = 'opacity 1s ease, transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else {
      // На мобильном — только прозрачность, никаких transform inline
      ring.style.transform  = '';
      ring.style.transition = 'opacity 1s ease';
      ring.style.marginLeft = '';
      ring.style.marginTop  = '';
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ring.classList.add('is-visible');
        if (isDesktop) {
          ring.style.transform = 'translate(-50%, -50%)';
        }
      });
    });

    // 2. Float — только на десктопе
    if (floatAnimation) {
      floatAnimation.cancel();
      floatAnimation = null;
    }

    if (isDesktop) {
      floatAnimation = ring.animate(
        [
          { transform: 'translate(-50%, -50%) translateY(0px)'   },
          { transform: 'translate(-50%, -50%) translateY(-14px)'  },
          { transform: 'translate(-50%, -50%) translateY(0px)'   },
        ],
        {
          duration:   4800,
          iterations: Infinity,
          easing:     'ease-in-out',
          delay:      1300,
        }
      );
    }
  }

  initAnimation();

  // ── Параллакс — только на десктопе ─────────
  function animateParallax() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    ring.style.marginLeft = `${currentX}px`;
    ring.style.marginTop  = `${currentY}px`;
    rafId = requestAnimationFrame(animateParallax);
  }

  document.addEventListener('mousemove', e => {
    if (!mq.matches) return; // игнорируем на мобильном
    const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    targetX = nx * 18;
    targetY = ny * 18;
    if (!rafId) rafId = requestAnimationFrame(animateParallax);
  });

  document.addEventListener('mouseleave', () => floatAnimation?.pause());
  document.addEventListener('mouseenter', () => floatAnimation?.play());

  // ── Сброс при смене брейкпоинта ────────────
  // (например, DevTools resize или поворот планшета)
  mq.addEventListener('change', () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    currentX = currentY = targetX = targetY = 0;
    ring.style.marginLeft = '';
    ring.style.marginTop  = '';
    initAnimation();
  });

  // ─── Слайдер соцсетей ──────────────────────
  initSocialSlider();

});

// =============================================
//  Social Feed Slider
// =============================================
function initSocialSlider() {
  const slider   = document.getElementById('socialSlider');
  const track    = document.getElementById('socialTrack');
  const dotsWrap = document.getElementById('socialDots');
  const prevBtn  = document.getElementById('socialPrev');
  const nextBtn  = document.getElementById('socialNext');

  if (!slider || !track) return;

  const slides = Array.from(track.querySelectorAll('.social-feed__slide'));
  const TOTAL  = slides.length; // 8

  let currentIndex = 0;
  let maxIndex     = 0;

  // ── Вычисляем maxIndex по DOM ───────────────
  function calcMaxIndex() {
    const slideW = slides[0].offsetWidth;
    const gap    = parseFloat(getComputedStyle(track).columnGap) || 10;
    const visible = slider.offsetWidth / (slideW + gap);
    maxIndex = Math.max(0, TOTAL - Math.ceil(visible));
  }

  // ── Строим точки ────────────────────────────
  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const btn = document.createElement('button');
      btn.className  = 'slider-dot' + (i === 0 ? ' is-active' : '');
      btn.setAttribute('aria-label', `Слайд ${i + 1}`);
      btn.setAttribute('role', 'tab');
      btn.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(btn);
    }
  }

  // ── Навигация ───────────────────────────────
  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));

    const slideW = slides[0].offsetWidth;
    const gap    = parseFloat(getComputedStyle(track).columnGap) || 10;
    // Небольшой peek: первый слайд чуть отступает от края,
    // при смещении предыдущий слайд частично виден слева
    const PEEK   = slideW * 0.22;
    const x      = PEEK - currentIndex * (slideW + gap);

    track.style.transform = `translateX(${x}px)`;
    updateUI();
  }

  function updateUI() {
    dotsWrap.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // ── Drag / Touch ────────────────────────────
  let isDragging   = false;
  let pointerStart = 0;
  let baseTranslate = 0;

  function getTranslateX() {
    const mat = new DOMMatrix(getComputedStyle(track).transform);
    return mat.m41;
  }

  track.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    isDragging   = true;
    pointerStart = e.clientX;
    baseTranslate = getTranslateX();
    track.style.transition = 'none';
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointermove', e => {
    if (!isDragging) return;
    const delta = e.clientX - pointerStart;
    track.style.transform = `translateX(${baseTranslate + delta}px)`;
  });

  track.addEventListener('pointerup', e => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    const delta = e.clientX - pointerStart;
    const slideW = slides[0].offsetWidth;
    if (Math.abs(delta) > slideW * 0.2) {
      goTo(delta < 0 ? currentIndex + 1 : currentIndex - 1);
    } else {
      goTo(currentIndex); // snap back
    }
  });

  // Отменяем клик после drag (чтобы не переходить по ссылке)
  track.addEventListener('click', e => {
    if (Math.abs(getTranslateX() - baseTranslate) > 5) e.preventDefault();
  });

  // ── Keyboard ────────────────────────────────
  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  // ── Init + Resize ───────────────────────────
  function init() {
    calcMaxIndex();
    buildDots();
    goTo(0);
  }

  init();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 150);
  });
}
