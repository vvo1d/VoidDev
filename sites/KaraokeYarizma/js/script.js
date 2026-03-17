

// ===================== НАШИ ЗАЛЫ — ПЕРЕКЛЮЧЕНИЕ =====================
let currentHall = 1;

const hallsData = {
  1: {
    number: "№ 1",
    area: "40 м²",
    capacity: "до 20-ти человек",
    mainImage: "./img/halls-1.jpg",
    neon: "YARIZMA"
  },
  2: {
    number: "№ 2",
    area: "35 м²",
    capacity: "до 12 человек",
    mainImage: "./img/halls-2.jpg",
    neon: "YARIZMA"
  },
  3: {
    number: "№ 3",
    area: "55 м²",
    capacity: "до 25 человек",
    mainImage: "./img/halls-3.jpg",
    neon: "YARIZMA"
  },
  4: {
    number: "№ 4",
    area: "45 м²",
    capacity: "до 18 человек",
    mainImage: "./img/halls-4.jpg",
    neon: "YARIZMA"
  }
};

function switchHall(hallNumber) {
  currentHall = hallNumber;
  
  const data = hallsData[hallNumber];
  if (!data) return;

  // Обновляем информацию
  document.getElementById('hall-number').textContent = data.number;
  document.getElementById('hall-area').textContent = data.area;
  document.getElementById('hall-capacity').textContent = data.capacity;

  // Плавная смена главного фото
  const mainImg = document.getElementById('main-hall-image');
  mainImg.style.opacity = 0;
  
  setTimeout(() => {
    mainImg.src = data.mainImage;
    mainImg.style.opacity = 1;
  }, 250);

  // Активный таб
  document.querySelectorAll('.hall-tab').forEach(tab => {
    if (parseInt(tab.dataset.hall) === hallNumber) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

// Переключение миниатюр (локально)
function changeMainImage(el) {
  const newSrc = el.querySelector('img').src;
  const mainImg = document.getElementById('main-hall-image');
  
  mainImg.style.opacity = 0;
  setTimeout(() => {
    mainImg.src = newSrc.replace('300/200', '1200/800'); // увеличиваем качество
    mainImg.style.opacity = 1;
  }, 200);
}

// Пагинация (пока заглушка)
function prevHall() {
  alert('Предыдущее фото в галерее зала');
}

function nextHall() {
  alert('Следующее фото в галерее зала');
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  // Активный таб по умолчанию
  switchHall(1);
});



const slider = document.getElementById('steps-slider');
let isDragging = false;
let startX, scrollLeft;
let velocity = 0;
let lastX = 0;
let animationFrame;

function getCurrentStep() {
  const slides = [...slider.querySelectorAll('.slide-wrapper')];
  const containerCenter = slider.scrollLeft + slider.clientWidth / 2;
  
  let closest = slides[0];
  let minDistance = Infinity;

  slides.forEach(slide => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const distance = Math.abs(slideCenter - containerCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closest = slide;
    }
  });
  return closest;
}

function updateActiveSlide() {
  const slides = slider.querySelectorAll('.slide-wrapper');
  const active = getCurrentStep();
  
  slides.forEach(s => s.classList.remove('active'));
  active.classList.add('active');
  
  // Обновляем пагинацию
  const stepNum = parseInt(active.dataset.step);
  document.getElementById('pagination').innerHTML = `
    ${stepNum} <span class="text-white/50">из 5</span>
  `;
}

function scrollSlider(direction) {
  const slideWidth = slider.querySelector('.slide-wrapper').offsetWidth + 24;
  slider.scrollBy({ left: slideWidth * direction, behavior: 'smooth' });
  
  // Обновляем пагинацию после скролла
  setTimeout(updateActiveSlide, 300);
}

// ==================== DRAG + SWIPE + ИНЕРЦИЯ ====================
function startDrag(e) {
  isDragging = true;
  startX = (e.type === 'mousedown' ? e.pageX : e.touches[0].pageX) - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  lastX = startX;
  velocity = 0;
  cancelAnimationFrame(animationFrame);
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();
  
  const x = (e.type === 'mousemove' ? e.pageX : e.touches[0].pageX) - slider.offsetLeft;
  const walk = (x - startX) * 1.8;
  slider.scrollLeft = scrollLeft - walk;
  
  velocity = (x - lastX) * 1.8;
  lastX = x;
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;

  // Инерция
  let momentum = velocity * 12;
  
  function animate() {
    momentum *= 0.94;
    slider.scrollLeft += momentum;
    
    if (Math.abs(momentum) > 0.5) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      updateActiveSlide();
    }
  }
  animate();
}

// События
slider.addEventListener('mousedown', startDrag);
slider.addEventListener('mousemove', drag);
slider.addEventListener('mouseup', endDrag);
slider.addEventListener('mouseleave', endDrag);

slider.addEventListener('touchstart', startDrag, { passive: true });
slider.addEventListener('touchmove', drag, { passive: false });
slider.addEventListener('touchend', endDrag);

slider.addEventListener('scroll', () => {
  clearTimeout(window.scrollTimeout);
  window.scrollTimeout = setTimeout(updateActiveSlide, 80);
});

// Инициализация слайдера при загрузке
document.addEventListener('DOMContentLoaded', () => {
  updateActiveSlide();
});

// ===================== FAQ АККОРДИОН =====================
function toggleFaq(index) {
  const items = document.querySelectorAll('.faq-item');
  const clickedItem = items[index];
  const button = clickedItem.querySelector('.faq-button');
  const content = clickedItem.querySelector('.faq-content');
  
  // Закрываем все остальные
  items.forEach((item, i) => {
    if (i !== index) {
      item.querySelector('.faq-button').classList.remove('active');
      item.querySelector('.faq-content').classList.remove('active');
    }
  });
  
  // Переключаем текущий
  button.classList.toggle('active');
  content.classList.toggle('active');
}

// ===================== СКРОЛЛ ВВЕРХ =====================
const scrollToTopBtn = document.getElementById('scrollToTop');

// Показ/скрытие кнопки при скролле
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

// Функция скролла вверх
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}