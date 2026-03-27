// ============================================================
// BURGER MENU TOGGLE
// ============================================================
const burger = document.querySelector('.burger');

if (burger) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
  });
}


// ============================================================
// TESTIMONIALS SLIDER
// ============================================================
const slides = document.querySelectorAll('.testimonials__slide');
const dots   = document.querySelectorAll('.testimonials__dot');

if (slides.length) {
  let current = 0;
  let autoplay;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAutoplay() {
    autoplay = setInterval(() => goToSlide(current + 1), 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
  }

  // Dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoplay();
    });
  });

  // Swipe
  const slider = document.querySelector('.testimonials__slider');
  let touchStartX = 0;

  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 40) return;
    goToSlide(delta < 0 ? current + 1 : current - 1);
    resetAutoplay();
  }, { passive: true });

  startAutoplay();
}


// ============================================================
// SKILLS BARS — animate on scroll into view
// ============================================================
const skillsFills = document.querySelectorAll('.skills__bar-fill');

if (skillsFills.length) {
  skillsFills.forEach(fill => {
    fill.style.setProperty('--target-width', fill.dataset.width + '%');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skills__bar-fill').forEach(fill => {
          fill.classList.add('animated');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) observer.observe(skillsSection);
}


// ============================================================
// FUN FACTS — count-up animation on scroll
// ============================================================
const factNumbers = document.querySelectorAll('.facts__number');

if (factNumbers.length) {
  function countUp(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  const factsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        factNumbers.forEach(countUp);
        factsObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const factsSection = document.querySelector('.facts');
  if (factsSection) factsObserver.observe(factsSection);
}
