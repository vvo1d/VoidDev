document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));

  document.querySelector('.reserve-form')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Заявка отправлена. Скоро с вами свяжемся!');
  });
});