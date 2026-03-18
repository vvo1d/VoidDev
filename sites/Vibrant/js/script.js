/* ═══════════════════════════════════════════════════════════
   script.js — Vibrant Landing Page
   All interactive behaviour
════════════════════════════════════════════════════════════ */

/* ── NAV SCROLL EFFECT ───────────────────────────────────── */
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled
})();


/* ── MOBILE HAMBURGER MENU ───────────────────────────────── */
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

  // Close on any link inside mobile menu
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      close();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();


/* ── SCROLL REVEAL (IntersectionObserver) ────────────────── */
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
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  elements.forEach((el) => observer.observe(el));
})();


/* ── STAGGER TESTIMONIAL CARDS ───────────────────────────── */
(function initTestiStagger() {
  document.querySelectorAll('.testi-card.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
})();


/* ── STAGGER FEATURE ROWS ────────────────────────────────── */
(function initFeatureStagger() {
  document.querySelectorAll('.feature-row.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.06) + 's';
  });
})();


/* ── SMOOTH ANCHOR SCROLL (with nav offset) ──────────────── */
(function initSmoothScroll() {
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
    10
  ) || 72;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
