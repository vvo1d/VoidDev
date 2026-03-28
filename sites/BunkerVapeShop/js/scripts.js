// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursor-follower");
let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + "px";
  follower.style.top = followerY + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();

const hoverEls = document.querySelectorAll(
  "a, button, .product-card, .service-card, .location-card",
);
hoverEls.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    follower.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    follower.classList.remove("hover");
  });
});

// ============================================
// NAVBAR SCROLL
// ============================================
const nav = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  },
  { passive: true },
);

// ============================================
// MOBILE MENU
// ============================================
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

burger.addEventListener("click", () => {
  const isOpen = burger.classList.toggle("open");
  mobileMenu.classList.toggle("open", isOpen);
  burger.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("open");
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

// ============================================
// PARALLAX HERO
// ============================================
const heroBg = document.getElementById("hero-bg");

window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight * 1.5) {
      heroBg.style.transform = `scale(1.3) translateY(${scrolled * 0.25}px)`;
    }
  },
  { passive: true },
);

// ============================================
// PARTICLES
// ============================================
const particlesContainer = document.getElementById("particles");
const PARTICLE_COUNT = 30;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  const size = Math.random() * 4 + 2;
  const delay = Math.random() * 12;
  const duration = Math.random() * 10 + 8;
  const x = Math.random() * 100;
  const dx = (Math.random() - 0.5) * 200;
  p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        --dx: ${dx}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        opacity: 0;
      `;
  particlesContainer.appendChild(p);
}

// ============================================
// SCROLL REVEAL (Intersection Observer)
// ============================================
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
);

revealEls.forEach((el) => observer.observe(el));

// ============================================
// ANIMATED COUNTERS
// ============================================
const counters = document.querySelectorAll(".stat-number[data-target]");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(ease * target);
        el.textContent = current.toLocaleString("ru-RU");
        if (progress < 1) requestAnimationFrame(update);
        else {
          el.textContent = target.toLocaleString("ru-RU");
          if (target >= 1000) el.textContent += "+";
        }
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 },
);

counters.forEach((c) => counterObserver.observe(c));

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ============================================
// STAGGER REVEAL for product cards + smoke puffs
// ============================================
const cards = document.querySelectorAll(".product-card");
cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;

  // Inject smoke puffs into each card
  const smokeWrap = document.createElement("div");
  smokeWrap.className = "product-smoke";
  smokeWrap.setAttribute("aria-hidden", "true");
  for (let j = 0; j < 3; j++) {
    const puff = document.createElement("div");
    puff.className = "product-smoke-puff";
    puff.style.setProperty("--puff-x", `${(Math.random() - 0.5) * 40}px`);
    smokeWrap.appendChild(puff);
  }
  card.appendChild(smokeWrap);
});

// ============================================
// CANVAS SMOKE — realistic particle smoke in hero
// ============================================
(function () {
  const canvas = document.getElementById("smoke-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H;
  function resize() {
    const hero = canvas.parentElement;
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // Smoke particle class
  class SmokeParticle {
    constructor() {
      this.reset();
    }
    reset() {
      // Spawn from bottom 40% of hero
      this.x = W * 0.05 + Math.random() * W * 0.9;
      this.y = H * 0.6 + Math.random() * H * 0.5;
      this.radius = 80 + Math.random() * 160;
      this.opacity = 0;
      this.maxOpacity = 0.18 + Math.random() * 0.22; // was 0.06-0.16, now 0.18-0.40
      this.speedY = -(0.4 + Math.random() * 0.9);
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.wobbleSpeed = 0.0015 + Math.random() * 0.003;
      this.phase = Math.random() * Math.PI * 2;
      this.life = 0;
      this.maxLife = 350 + Math.random() * 350;
      this.growRate = 0.2 + Math.random() * 0.35;
      // 40% red, 60% white-grey smoke
      this.isRed = Math.random() < 0.4;
    }
    update() {
      this.life++;
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.life * this.wobbleSpeed + this.phase) * 0.7;
      this.radius += this.growRate;

      // Fade in (first 20%) → hold → fade out (last 40%)
      const lifeRatio = this.life / this.maxLife;
      if (lifeRatio < 0.2) {
        this.opacity = (lifeRatio / 0.2) * this.maxOpacity;
      } else if (lifeRatio > 0.6) {
        this.opacity = ((1 - lifeRatio) / 0.4) * this.maxOpacity;
      } else {
        this.opacity = this.maxOpacity;
      }

      if (this.life >= this.maxLife || this.y + this.radius < -100) {
        this.reset();
      }
    }
    draw(ctx) {
      if (this.opacity <= 0.005) return;
      ctx.save();
      ctx.globalAlpha = this.opacity;

      const grad = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );

      if (this.isRed) {
        grad.addColorStop(0,   "rgba(210, 60, 40, 0.85)");
        grad.addColorStop(0.3, "rgba(192, 57, 43, 0.45)");
        grad.addColorStop(0.65,"rgba(192, 57, 43, 0.15)");
        grad.addColorStop(1,   "rgba(192, 57, 43, 0)");
      } else {
        grad.addColorStop(0,   "rgba(220, 220, 230, 0.75)");
        grad.addColorStop(0.3, "rgba(190, 190, 200, 0.35)");
        grad.addColorStop(0.65,"rgba(160, 160, 170, 0.12)");
        grad.addColorStop(1,   "rgba(120, 120, 130, 0)");
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Create particles — more, staggered across full hero
  const SMOKE_COUNT = 50;
  const smokeParticles = [];
  for (let i = 0; i < SMOKE_COUNT; i++) {
    const p = new SmokeParticle();
    // Stagger so smoke is present immediately on load
    p.life = Math.floor(Math.random() * p.maxLife);
    p.y = H * 0.1 + Math.random() * H * 1.1;
    smokeParticles.push(p);
  }

  let scrollY = 0;
  window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

  function animate() {
    // Only render when hero is visible
    if (scrollY > H * 1.5) {
      requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, W, H);

    for (const p of smokeParticles) {
      p.update();
      p.draw(ctx);
    }

    requestAnimationFrame(animate);
  }

  animate();
})();

// ============================================
// LEAFLET MAP — store locations
// ============================================
(function () {
  const mapEl = document.getElementById("store-map");
  if (!mapEl || typeof L === "undefined") return;

  // Ensure container has rendered before init
  setTimeout(function () { initMap(); }, 100);

  function initMap() {
  const stores = [
    { city: "Саратов", address: "ул. Ново-Астраханское шоссе, 107г с1", lat: 51.4960, lng: 45.9214 },
    { city: "Саратов", address: "пл. Орджоникидзе, 11",                  lat: 51.5041, lng: 45.9484 },
    { city: "Саратов", address: "ул. Н.И. Вавилова, 9",                  lat: 51.5347, lng: 46.0108 },
    { city: "Саратов", address: "ул. 2-я Садовая, 4",                    lat: 51.5175, lng: 46.0077 },
    { city: "Саратов", address: "ул. Огородная, 149",                    lat: 51.5085, lng: 45.9374 },
    { city: "Саратов", address: "ул. Рахова, 64/70а",                    lat: 51.5279, lng: 46.0124 },
    { city: "Саратов", address: "ул. Танкистов, 64",                     lat: 51.5619, lng: 46.0214 },
    { city: "Саратов", address: "ул. Чапаева, 60/64",                    lat: 51.5316, lng: 46.0211 },
    { city: "Саратов", address: "ул. Колхозная, 1а",                     lat: 51.5474, lng: 46.0169 },
    { city: "Саратов", address: "ул. Ипподромная, 9",                    lat: 51.5843, lng: 45.9788 },
    { city: "Саратов", address: "ул. Техническая, 5",                    lat: 51.5758, lng: 46.0122 },
    { city: "Саратов", address: "ул. Тархова, 27",                       lat: 51.6103, lng: 45.9912 },
    { city: "Саратов", address: "ул. Горького, 30",                      lat: 51.5307, lng: 46.0301 },
    { city: "Саратов", address: "ул. Вольская, 21/27",                   lat: 51.5226, lng: 46.0185 },
    { city: "Саратов", address: "ул. Вольская, 44",                      lat: 51.5324, lng: 46.0248 },
    { city: "Саратов", address: "ул. Академика Семенова, 9",             lat: 51.6016, lng: 46.0178 },
    { city: "Энгельс",  address: "пр. Фридриха Энгельса, 4",             lat: 51.4804, lng: 46.1265 },
  ];

  // Init map — bounds will be set after markers are added
  const map = L.map("store-map", {
    zoomControl: false,
    attributionControl: false,
  });

  // Dark CartoDB tiles
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
  }).addTo(map);

  // Attribution bottom-right, styled small
  L.control.attribution({ position: "bottomright", prefix: false })
    .addAttribution('© <a href="https://www.openstreetmap.org/copyright" style="color:#555">OSM</a> © <a href="https://carto.com" style="color:#555">CARTO</a>')
    .addTo(map);

  // Zoom control top-right
  L.control.zoom({ position: "topright" }).addTo(map);

  // Custom icon (CSS-based via DivIcon)
  function makeIcon(active) {
    return L.divIcon({
      html: `<div class="bunker-marker${active ? " bunker-marker--active" : ""}"></div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -34],
    });
  }

  const locationCards = document.querySelectorAll(".location-card[data-idx]");
  const markers = [];

  stores.forEach(function (store, idx) {
    const marker = L.marker([store.lat, store.lng], { icon: makeIcon(false) })
      .addTo(map)
      .bindPopup(
        `<div class="map-popup">
          <div class="map-popup-city">${store.city}</div>
          <div class="map-popup-address">${store.address}</div>
          <div class="map-popup-hours">Ежедневно 10:00 – 22:00</div>
        </div>`,
        { maxWidth: 240, minWidth: 190 }
      );

    markers.push(marker);

    // Click on marker → highlight card
    marker.on("click", function () {
      locationCards.forEach(function (c) { c.classList.remove("map-active"); });
      const card = document.querySelector(`.location-card[data-idx="${idx}"]`);
      if (card) {
        card.classList.add("map-active");
        card.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });

    marker.on("popupclose", function () {
      const card = document.querySelector(`.location-card[data-idx="${idx}"]`);
      if (card) card.classList.remove("map-active");
    });
  });

  // Fit map to show all markers
  const group = L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.1));

  // Click on card → open marker popup & fly to it
  locationCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const idx = parseInt(card.dataset.idx);
      if (isNaN(idx) || !markers[idx]) return;
      map.flyTo(markers[idx].getLatLng(), 15, { duration: 0.8 });
      markers[idx].openPopup();
      locationCards.forEach(function (c) { c.classList.remove("map-active"); });
      card.classList.add("map-active");
    });
  });

  // Fix tile rendering after container dimensions settle
  setTimeout(function () { map.invalidateSize(); }, 200);
  } // end initMap
})();

// ============================================
// PARALLAX ON FEATURES IMAGE — mouse follow
// ============================================
(function () {
  const featuresSection = document.querySelector(".features");
  const featuresImgWrap = document.querySelector(".features-img-wrap");
  const featuresImg = featuresImgWrap && featuresImgWrap.querySelector("img");

  if (!featuresSection || !featuresImg) return;

  // Current and target offsets (smooth interpolation)
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  // Scroll-based vertical offset
  let scrollOffsetY = 0;

  const MOUSE_STRENGTH = 18;  // max px shift on mouse move
  const LERP = 0.06;           // smoothing factor (lower = smoother/slower)

  // Scroll parallax
  window.addEventListener("scroll", () => {
    const rect = featuresSection.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    scrollOffsetY = (progress - 0.5) * 50;
  }, { passive: true });

  // Mouse move → calculate offset relative to section center
  document.addEventListener("mousemove", (e) => {
    const rect = featuresSection.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    // Normalise cursor to [-1, 1] within the section bounds
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (window.innerWidth / 2);
    const ny = (e.clientY - cy) / (window.innerHeight / 2);

    targetX = nx * MOUSE_STRENGTH;
    targetY = ny * MOUSE_STRENGTH;
  });

  // Reset when mouse leaves the section
  featuresSection.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  // Animation loop — smooth lerp
  function tick() {
    currentX += (targetX - currentX) * LERP;
    currentY += (targetY - currentY) * LERP;

    featuresImg.style.transform =
      `scale(1.15) translate(${currentX}px, ${currentY + scrollOffsetY}px)`;

    requestAnimationFrame(tick);
  }

  tick();
})();
