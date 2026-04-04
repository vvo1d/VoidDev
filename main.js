/* ============================================================
   VOIDDEV — main.js
   ============================================================ */

/* ── Custom Cursor ── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

/* ── Star Canvas ── */
function createStars() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Build star data
  const stars = Array.from({ length: 350 }, () => ({
    x:     Math.random(),
    y:     Math.random(),
    size:  Math.random() * 1.8 + 0.4,
    speed: Math.random() * 0.0008 + 0.0003,
    phase: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 0.00006,
  }));

  // A handful of "shooting stars"
  const shoots = Array.from({ length: 4 }, () => ({
    active: false,
    x: 0, y: 0, vx: 0, vy: 0,
    life: 0, maxLife: 0,
    timer: Math.random() * 400,
  }));

  let t = 0;

  function drawShootingStar(s) {
    const alpha = Math.sin((s.life / s.maxLife) * Math.PI) * 0.9;
    const len   = 160 * (s.life / s.maxLife);
    const grd   = ctx.createLinearGradient(
      s.x - s.vx * len, s.y - s.vy * len, s.x, s.y
    );
    grd.addColorStop(0, 'transparent');
    grd.addColorStop(1, `rgba(165,243,252,${alpha})`);
    ctx.beginPath();
    ctx.strokeStyle = grd;
    ctx.lineWidth   = 1.5;
    ctx.moveTo(s.x - s.vx * len, s.y - s.vy * len);
    ctx.lineTo(s.x, s.y);
    ctx.stroke();
  }

  function animate() {
    t++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Regular stars
    stars.forEach(s => {
      const alpha = (Math.sin(t * s.speed + s.phase) + 1) / 2 * 0.7 + 0.2;
      s.x += s.drift;
      if (s.x < 0) s.x = 1;
      if (s.x > 1) s.x = 0;

      const px = s.x * canvas.width;
      const py = s.y * canvas.height;

      // Subtle glow
      if (s.size > 1.4) {
        const grd = ctx.createRadialGradient(px, py, 0, px, py, s.size * 4);
        grd.addColorStop(0, `rgba(165,243,252,${alpha * 0.5})`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(px - s.size * 4, py - s.size * 4, s.size * 8, s.size * 8);
      }

      ctx.globalAlpha = alpha;
      ctx.fillStyle   = '#a5f3fc';
      ctx.fillRect(px - s.size / 2, py - s.size / 2, s.size, s.size);
      ctx.globalAlpha = 1;
    });

    // Shooting stars
    shoots.forEach(s => {
      if (!s.active) {
        s.timer--;
        if (s.timer <= 0) {
          s.active  = true;
          s.x       = Math.random() * canvas.width;
          s.y       = Math.random() * canvas.height * 0.5;
          const angle = (Math.random() * 30 + 15) * Math.PI / 180;
          const speed = Math.random() * 10 + 8;
          s.vx      = Math.cos(angle) * speed;
          s.vy      = Math.sin(angle) * speed;
          s.life    = 0;
          s.maxLife = Math.random() * 40 + 25;
        }
      } else {
        s.x    += s.vx;
        s.y    += s.vy;
        s.life++;
        drawShootingStar(s);
        if (s.life >= s.maxLife) {
          s.active = false;
          s.timer  = Math.random() * 500 + 200;
        }
      }
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ── Mobile Menu ── */
function initMobileMenu() {
  const btn  = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    const isOpen = menu.classList.contains('open');
    btn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* ── Projects Data & Render ── */
const projects = [
  {
    id: 1,
    title: 'YellowKitchen',
    desc: 'Лендинг для сети ресторанов с 3D анимациями и интерактивными элементами',
    tags: ['HTML', 'CSS', 'JS'],
    image: './img/YellowKitchen.webp',
    demoUrl: './sites/YellowKitchen/index.html',
  },
  {
    id: 2,
    title: 'StarBucks',
    desc: 'Сайт производителя кофе с параллакс-эффектами и видео-фоном',
    tags: ['HTML', 'CSS', 'GSAP'],
    image: './img/Starbucks.webp',
    demoUrl: './sites/StarBucks/index.html',
  },
  {
    id: 3,
    title: 'Wealthfront',
    desc: 'Лендинг для финансовой платформы с адаптивным дизайном',
    tags: ['Framer', 'Webflow', 'GSAP'],
    image: './img/wealthfront.webp',
    demoUrl: './sites/Wealthfront/index.html',
  },
  {
    id: 4,
    title: 'ManaSar',
    desc: 'Сайт мастерской по ремонту динамиков',
    tags: ['HTML', 'CSS', 'JS'],
    image: './img/ManaSar.webp',
    demoUrl: './sites/ManaSar/index.html',
  },
  {
    id: 5,
    title: 'NoirPoker',
    desc: 'Сайт для клуба спортивного покера',
    tags: ['HTML', 'CSS', 'JS'],
    image: './img/NoirPoker.webp',
    demoUrl: './sites/NoirPoker/index.html',
  },
  {
    id: 6,
    title: 'Yarizma',
    desc: 'Сайт для сети караоке-залов',
    tags: ['HTML', 'CSS', 'Tailwind', 'JS'],
    image: './img/Karaoke.webp',
    demoUrl: './sites/KaraokeYarizma/index.html',
  },
  {
    id: 7,
    title: 'Vibrant',
    desc: 'Шаблон для SaaS-продукта с современным UI',
    tags: ['HTML', 'CSS', 'JS'],
    image: './img/Vibrant.webp',
    demoUrl: './sites/Vibrant/index.html',
  },
  {
    id: 8,
    title: 'MoonRiver',
    desc: 'Сайт ювелирных изделий',
    tags: ['HTML', 'CSS', 'JS'],
    image: './img/MoonRiver.webp',
    demoUrl: './sites/MoonRiver/index.html',
  },
  {
    id: 9,
    title: 'DesignStudio',
    desc: 'Студия дизайна',
    tags: ['HTML', 'CSS', 'JS'],
    image: './img/DesignStudio.webp',
    demoUrl: './sites/DesignStudio/index.html',
  },
  {
    id: 10,
    title: 'Bunker',
    desc: 'Сеть магазинов электронных сигарет',
    tags: ['HTML', 'CSS', 'JS'],
    image: './img/Bunker.webp',
    demoUrl: './sites/BunkerVapeShop/index.html',
  },
  {
    id: 11,
    title: 'MNTN',
    desc: 'Походный гид',
    tags: ['HTML', 'CSS', 'JS'],
    image: './img/MNTN.webp',
    demoUrl: './sites/MNTN/index.html',
  }

];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className  = 'project-card reveal';
    card.style.setProperty('--i', i);
    card.innerHTML = `
      <div class="project-img-wrap">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="project-tags-bar">
          ${p.tags.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>
      <div class="project-body">
        <div class="project-title">${p.title}</div>
        <p class="project-desc">${p.desc}</p>
        <button class="btn-open" onclick="event.stopPropagation(); openProject(${p.id})">
          Открыть проект ↗
        </button>
      </div>
    `;
    card.addEventListener('click', () => openProject(p.id));
    grid.appendChild(card);
  });

  // Trigger reveal observer after render
  observeReveal();
}

/* ── Modal ── */
let currentProject = null;

function openProject(id) {
  currentProject = projects.find(p => p.id === id);
  if (!currentProject) return;

  document.getElementById('modal-title').textContent = currentProject.title;
  const iframe  = document.getElementById('modal-iframe');
  const loader  = document.getElementById('modal-loading');
  const overlay = document.getElementById('project-modal');

  iframe.src = '';
  loader.style.display = 'flex';
  iframe.src = currentProject.demoUrl;
  iframe.onload = () => { loader.style.display = 'none'; };

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('project-modal');
  const iframe  = document.getElementById('modal-iframe');
  overlay.classList.remove('open');
  iframe.src = '';
  document.body.style.overflow = '';
}

function openInNewTab() {
  if (currentProject) window.open(currentProject.demoUrl, '_blank');
}

// Close on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Close on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('project-modal');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
  }
});

/* ── Scroll-reveal ── */
function observeReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'),
          (parseInt(entry.target.style.getPropertyValue('--i')) || 0) * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ── Smooth scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Navbar shrink on scroll ── */
function initNavbar() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.paddingTop    = '0.625rem';
      nav.style.paddingBottom = '0.625rem';
    } else {
      nav.style.paddingTop    = '';
      nav.style.paddingBottom = '';
    }
  }, { passive: true });
}

/* ── Counter animation ── */
function animateCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.counter, 10);
      let cur   = 0;
      const dur = 1400;
      const step = end / (dur / 16);
      const timer = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.textContent = Math.round(cur) + (el.dataset.suffix || '');
        if (cur >= end) clearInterval(timer);
      }, 16);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
}

/* ── Init ── */
window.addEventListener('DOMContentLoaded', () => {
  initCursor();
  createStars();
  initMobileMenu();
  renderProjects();
  initSmoothScroll();
  initNavbar();
  animateCounters();
  observeReveal();

  // Mark static reveals
  document.querySelectorAll('.reveal').forEach(el => {
    new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        el.classList.add('visible');
        obs.unobserve(el);
      }
    }, { threshold: 0.1 }).observe(el);
  });
});