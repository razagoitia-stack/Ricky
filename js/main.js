/* ============================================================
   RETROFIT.MX — Interactive JavaScript 2026
   ============================================================ */

/* ─── HERO ANIMATIONS ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(startHeroAnimations, 300);
});

function startHeroAnimations() {
  document.querySelectorAll('.animate-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), i * 200);
  });
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
  toggleBackToTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ─── BACK TO TOP ───────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');
function toggleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─── PARTICLE CANVAS ───────────────────────────────────── */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '30,83,216' : '0,200,240';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(30,83,216,${0.06 * (1 - dist/100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ─── SCROLL REVEAL ─────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── COUNTER ANIMATION ─────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* ─── CALCULATOR (EC-VENT SAVINGS) ──────────────────────── */
const SAVING_PCT = 0.55;
const CO2_KG_PER_KWH = 0.454;

const calcRanges = [
  { id: 'potenciaKw', fmt: v => Math.round(v) },
  { id: 'horasOp',   fmt: v => Math.round(v) },
  { id: 'diasOp',    fmt: v => Math.round(v) },
  { id: 'tarifaKwh', fmt: v => v.toFixed(2) },
];

calcRanges.forEach(({ id, fmt }) => {
  const input = document.getElementById(id);
  const display = document.getElementById(id + 'Val');
  if (!input || !display) return;
  input.addEventListener('input', () => {
    display.textContent = fmt(parseFloat(input.value));
    runCalculator();
  });
});

const calcBtn = document.getElementById('calcBtn');
if (calcBtn) calcBtn.addEventListener('click', () => runCalculator(true));

function runCalculator(animate = false) {
  const potencia = parseFloat(document.getElementById('potenciaKw').value) || 75;
  const horas    = parseFloat(document.getElementById('horasOp').value) || 16;
  const dias     = parseFloat(document.getElementById('diasOp').value) || 350;
  const tarifa   = parseFloat(document.getElementById('tarifaKwh').value) || 2.8;

  const kwh_saved_annual  = Math.round(potencia * horas * dias * SAVING_PCT);
  const saved_anual_mxn   = Math.round(kwh_saved_annual * tarifa);
  const co2_tons_annual   = Math.round(kwh_saved_annual * CO2_KG_PER_KWH / 1000 * 10) / 10;
  const after_pct         = Math.round((1 - SAVING_PCT) * 100);

  document.getElementById('resAnual').textContent = saved_anual_mxn.toLocaleString();
  document.getElementById('resKwh').textContent   = kwh_saved_annual.toLocaleString();
  document.getElementById('resCo2').textContent   = co2_tons_annual.toFixed(1);
  document.getElementById('resPct').textContent   = Math.round(SAVING_PCT * 100);

  const afterBar = document.getElementById('consAfterBar');
  if (afterBar) {
    if (animate) {
      afterBar.style.width = '0%';
      afterBar.textContent = '';
      setTimeout(() => {
        afterBar.style.width = after_pct + '%';
        afterBar.textContent = after_pct + '%';
      }, 80);
    } else {
      afterBar.style.width = after_pct + '%';
      afterBar.textContent = after_pct + '%';
    }
  }
}

runCalculator();

/* ─── PROJECTS FILTER ───────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const cat = card.dataset.category || '';
      if (filter === 'all' || cat.includes(filter)) {
        card.style.opacity = '1'; card.style.transform = '';
        card.style.display = '';
      } else {
        card.style.opacity = '0';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

/* ─── CAROUSEL ARROWS ───────────────────────────────────── */
document.querySelectorAll('.carousel-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const carousel = document.getElementById(btn.dataset.target);
    if (!carousel) return;
    const cardW = (carousel.querySelector('.cc')?.offsetWidth || 300) + 20;
    const dir = btn.classList.contains('carousel-prev') ? -1 : 1;
    carousel.scrollBy({ left: dir * cardW, behavior: 'smooth' });
  });
});

/* ─── MODAL ─────────────────────────────────────────────── */
const modalOverlay = document.getElementById('modalOverlay');
const modalBody    = document.getElementById('modalBody');

document.querySelectorAll('.cc').forEach(card => {
  card.addEventListener('click', () => {
    const tmpl = document.getElementById(card.dataset.modalId);
    if (!tmpl) return;
    const imgEl = card.querySelector('.cc-img');
    let imgHtml = '';
    if (imgEl) imgHtml = `<img src="${imgEl.src}" class="modal-img" alt="${imgEl.alt}">`;
    modalBody.innerHTML = imgHtml + tmpl.innerHTML;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ─── CONTACT FORM ───────────────────────────────────────── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Solicitud Enviada';
    document.getElementById('formSuccess').classList.add('visible');
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Solicitar Evaluación Gratuita';
      btn.disabled = false;
    }, 3000);
  }, 1500);
});

/* ─── SMOOTH SCROLL ─────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ─── PARALLAX HERO ORBS ────────────────────────────────── */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const speed = 0.08 + i * 0.04;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/* ─── CARD TILT ─────────────────────────────────────────── */
document.querySelectorAll('.tech-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ─── HERO STATS COUNTER ────────────────────────────────── */
const heroStatObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(el => animateCounter(el));
      heroStatObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroStatObserver.observe(heroStats);

console.log('%c⚡ RETROFIT.MX', 'color:#1E53D8;font-size:24px;font-weight:900;');
console.log('%cEficiencia en Movimiento · Muros de Ventiladores EC para HVAC', 'color:#00C8F0;font-size:14px;');
