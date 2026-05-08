// === Theme Toggle ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
if (localStorage.getItem('theme') === 'light') body.classList.add('light');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

// === Navbar & Mobile Menu ===
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  body.classList.toggle('menu-open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
  });
});

// === Live Clock ===
function updateClock() {
  const now = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Phnom_Penh',
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  }).replace(',', ' —');
  document.getElementById('live-time').textContent = now + ' (+07)';
}
setInterval(updateClock, 1000);
updateClock();

// === Progress Bars, Scroll Reveal, Stats Counter, 3D Tilt ===
const progressBars = document.querySelectorAll('.prog');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.dataset.width;
      setTimeout(() => bar.style.width = width + '%', 300);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.7 });
progressBars.forEach(bar => skillObserver.observe(bar));

const revealElements = document.querySelectorAll('.skill, .box, .stat');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll('.count');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.dataset.target;
    const count = +counter.innerText;
    const inc = target / 200;
    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target + (target >= 100 ? '+' : '');
    }
  };
  const counterObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { updateCount(); counterObs.unobserve(counter); }
  }, { threshold: 0.5 });
  counterObs.observe(counter);
});

document.querySelectorAll('[data-tilt]').forEach(box => {
  box.addEventListener('mousemove', e => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
  });
  box.addEventListener('mouseleave', () => {
    box.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
  });
});