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

// === Mobile Menu ===
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');

hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
closeMenu.addEventListener('click', () => mobileMenu.classList.remove('active'));
mobileMenu.addEventListener('click', e => {
  if (e.target === mobileMenu) mobileMenu.classList.remove('active');
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

// === Project Filtering ===
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags').split(' ');
      if (filter === 'all' || tags.includes(filter)) {
        card.style.display = 'block';
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.remove('visible');
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// === Lightbox Modal ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const projectImgs = document.querySelectorAll('[data-lightbox]');

projectImgs.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('visible');
  });
});

closeBtn.addEventListener('click', () => lightbox.classList.remove('visible'));
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('visible');
});

// === Scroll Reveal ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

projectCards.forEach(card => {
  card.style.transition = 'all .6s ease';
  observer.observe(card);
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