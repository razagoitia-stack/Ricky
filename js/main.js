/* ============================================================
   RETROFIT.MX — Interactive JavaScript 2026
   ============================================================ */

/* ─── LOADER ─────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startHeroAnimations();
  }, 1800);
});

/* ─── CUSTOM CURSOR ─────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .fwb-card, .tech-card, .ben-card, .project-card, .filter-btn, .faq-q, input, select, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ─── HERO ANIMATIONS ───────────────────────────────────── */
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
/*
 * Model from brand guidelines:
 * Typical saving = 55% of HVAC fan energy consumption.
 * kWh_saved = potencia_kw × horas × dias × 0.55
 * Result: annual savings in MXN, kWh saved, CO2 avoided.
 */
const SAVING_PCT = 0.55;
const CO2_KG_PER_KWH = 0.454; // Mexico grid factor

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

/* ─── TESTIMONIALS SLIDER ───────────────────────────────── */
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('sliderDots');
let current = 0;
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
const total = cards.length;

if (total > 0) {
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  document.getElementById('prevBtn').addEventListener('click', () => goTo((current - 1 + total) % total));
  document.getElementById('nextBtn').addEventListener('click', () => goTo((current + 1) % total));

  let autoSlide = setInterval(() => goTo((current + 1) % total), 5000);
  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goTo((current + 1) % total), 5000);
  });
}

function goTo(idx) {
  current = idx;
  track.style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

/* ─── FAQ ACCORDION ─────────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

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
