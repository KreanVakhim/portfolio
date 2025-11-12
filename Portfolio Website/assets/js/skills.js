// === Theme Toggle ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') body.classList.add('light');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

// === Navbar Scroll Effect ===
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
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

// === Progress Bars ===
const progressBars = document.querySelectorAll('.prog');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      setTimeout(() => bar.style.width = width + '%', 200);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.6 });

progressBars.forEach(bar => skillObserver.observe(bar));

// === Scroll Reveal (Soft Skills & Stats) ===
const revealElements = document.querySelectorAll('.skill, .box, .stat');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => {
  el.style.transition = 'all .6s ease';
  revealObserver.observe(el);
});

// === Stats Counter ===
const counters = document.querySelectorAll('.count');
const speed = 200;

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target + (target === 100 ? '+' : '+');
    }
  };

  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      updateCount();
      counterObserver.unobserve(counter);
    }
  }, { threshold: 0.5 });

  counterObserver.observe(counter);
});

// === 3D Tilt Effect ===
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
  });
});