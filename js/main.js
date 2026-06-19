/* ============================================================
   RETROFIT.MX — Interactive JavaScript
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

document.querySelectorAll('a, button, .service-card, .filter-btn, .faq-q, input, select, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ─── HERO ANIMATIONS ───────────────────────────────────── */
function startHeroAnimations() {
  document.querySelectorAll('.animate-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), i * 200);
  });
  buildWindows();
  animateWindows();
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
    this.color = Math.random() > 0.5 ? '0,245,160' : '0,217,245';
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
        ctx.strokeStyle = `rgba(0,245,160,${0.06 * (1 - dist/100)})`;
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

/* ─── BUILDING WINDOWS ──────────────────────────────────── */
function buildWindows() {
  const container = document.querySelector('.building-windows');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 48; i++) {
    const w = document.createElement('div');
    w.className = 'win';
    container.appendChild(w);
  }
}

function animateWindows() {
  const windows = document.querySelectorAll('.win');
  if (!windows.length) return;
  setInterval(() => {
    const idx = Math.floor(Math.random() * windows.length);
    const w = windows[idx];
    if (Math.random() > 0.5) {
      w.classList.remove('lit', 'lit-yellow');
      if (Math.random() > 0.7) {
        w.classList.add('lit-yellow');
      } else {
        w.classList.add('lit');
      }
    } else {
      w.classList.remove('lit', 'lit-yellow');
    }
  }, 200);
}

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

/* ─── CALCULATOR ─────────────────────────────────────────── */
const calcInputs = ['m2', 'consumo', 'tarifa'];

calcInputs.forEach(id => {
  const input = document.getElementById(id);
  const display = document.getElementById(id + 'Val');
  if (!input || !display) return;
  input.addEventListener('input', () => {
    const val = parseFloat(input.value);
    if (id === 'tarifa') display.textContent = val.toFixed(2);
    else display.textContent = val.toLocaleString();
    runCalculator();
  });
});

document.querySelectorAll('input[name="hvacAge"], input[name="lighting"], input[name="bms"]')
  .forEach(r => r.addEventListener('change', runCalculator));

document.getElementById('calcBtn').addEventListener('click', () => {
  runCalculator(true);
});

function runCalculator(animate = false) {
  const consumo = parseFloat(document.getElementById('consumo').value) || 50000;
  const tarifa = parseFloat(document.getElementById('tarifa').value) || 2.5;

  const hvacSaving = parseFloat(document.querySelector('input[name="hvacAge"]:checked')?.value || 0.25);
  const lightSaving = parseFloat(document.querySelector('input[name="lighting"]:checked')?.value || 0.35);
  const bmsSaving = parseFloat(document.querySelector('input[name="bms"]:checked')?.value || 0.08);

  const totalPctRaw = (hvacSaving + lightSaving + bmsSaving);
  const totalPct = Math.min(totalPctRaw, 0.65);
  const savedKwh = Math.round(consumo * totalPct);
  const savedMes = Math.round(savedKwh * tarifa);
  const savedAnual = savedMes * 12;
  const co2 = Math.round(savedKwh * 12 * 0.000454);
  const inversEst = savedAnual * 3.2;
  const roi = (inversEst / savedAnual).toFixed(1);

  document.getElementById('resKwh').textContent = savedKwh.toLocaleString();
  document.getElementById('resMes').textContent = savedMes.toLocaleString();
  document.getElementById('resAnual').textContent = savedAnual.toLocaleString();
  document.getElementById('resPct').textContent = Math.round(totalPct * 100);
  document.getElementById('resRoi').textContent = roi;
  document.getElementById('resCo2').textContent = co2.toLocaleString();

  const hvacPct = Math.round((hvacSaving / totalPctRaw) * 100);
  const ledPct = Math.round((lightSaving / totalPctRaw) * 100);
  const bmsPct = Math.round((bmsSaving / totalPctRaw) * 100);

  const chartBars = document.getElementById('chartBars');
  chartBars.innerHTML = `
    ${chartBar('HVAC', hvacPct, animate)}
    ${chartBar('Iluminación LED', ledPct, animate)}
    ${chartBar('Automatización BMS', bmsPct, animate)}
  `;

  if (animate) {
    setTimeout(() => {
      chartBars.querySelectorAll('.chart-bar-fill').forEach(b => {
        b.style.width = b.dataset.pct + '%';
      });
    }, 50);
  } else {
    chartBars.querySelectorAll('.chart-bar-fill').forEach(b => {
      b.style.width = b.dataset.pct + '%';
    });
  }
}

function chartBar(label, pct, animate) {
  return `<div class="chart-item">
    <div class="chart-label">${label}</div>
    <div class="chart-bar-bg">
      <div class="chart-bar-fill" data-pct="${pct}" style="width:${animate ? 0 : pct}%"></div>
    </div>
    <div class="chart-pct">${pct}%</div>
  </div>`;
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
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
    document.getElementById('formSuccess').classList.add('visible');
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Solicitud de Diagnóstico Gratuito';
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
    const speed = 0.1 + i * 0.05;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/* ─── CARD TILT EFFECT ───────────────────────────────────── */
document.querySelectorAll('.what-card, .result-card, .sector-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── TYPEWRITER HERO (extra effect) ───────────────────────── */
const line2 = document.querySelector('.hero-title .line-2');
if (line2) {
  const texts = ['Multiplica tus Ahorros.', 'Reduce tu Huella de CO₂.', 'Certifica tu Edificio LEED.', 'Potencia tu Inversión.'];
  let textIdx = 0, charIdx = 0, isDeleting = false;
  const originalText = texts[0];

  function typeWriter() {
    const full = texts[textIdx];
    if (isDeleting) {
      line2.textContent = full.substring(0, charIdx - 1);
      charIdx--;
    } else {
      line2.textContent = full.substring(0, charIdx + 1);
      charIdx++;
    }
    let delay = isDeleting ? 50 : 90;
    if (!isDeleting && charIdx === full.length) { delay = 2500; isDeleting = true; }
    if (isDeleting && charIdx === 0) { isDeleting = false; textIdx = (textIdx + 1) % texts.length; delay = 300; }
    setTimeout(typeWriter, delay);
  }
  setTimeout(typeWriter, 3000);
}

/* ─── STATS COUNTER ON SCROLL ───────────────────────────── */
const resultCounterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(el => animateCounter(el));
      resultCounterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) resultCounterObserver.observe(heroStats);

/* ─── GLOWING BORDER ON HOVER (service cards) ──────────── */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.service-front').style.borderColor = 'rgba(0,245,160,0.2)';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.service-front').style.borderColor = '';
  });
});

console.log('%c⚡ RETROFIT.MX', 'color:#00f5a0;font-size:24px;font-weight:900;');
console.log('%cLíderes en Eficiencia Energética en México', 'color:#00d9f5;font-size:14px;');
