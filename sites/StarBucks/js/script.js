const thumbs = document.querySelectorAll(".thumbs img");
const heroImage = document.querySelector(".hero-image img");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    heroImage.src = thumb.src;
  });
});

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});

const links = document.querySelectorAll(".nav a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
  });
});

// Для scroll-to-top кнопки

const scrollTop = document.getElementById("scrollTop");

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Slider logic

const track = document.querySelector(".slider-track");
const next = document.querySelector(".slider-next");

const cards = document.querySelectorAll(".product-card");

let index = 0;

const visibleCards = 3;

next.addEventListener("click", () => {
  index++;

  if (index > cards.length - visibleCards) {
    index = 0;
  }

  const cardWidth = cards[0].offsetWidth + 40;

  track.style.transform = `translateX(-${index * cardWidth}px)`;
});
