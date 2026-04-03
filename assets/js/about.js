// === Theme Toggle ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') body.classList.add('light');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

// === Navbar Scroll & Mobile Menu ===
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

document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
  }
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

// === Scroll Reveal & Tilt ===
const cards = document.querySelectorAll('.card, .hobbies .box');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => observer.observe(card));

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

// === Background Card Image Preview ===
const bgCards = document.querySelectorAll('.bg-card');
const imageModal = document.getElementById('bg-image-modal');
const imageView = document.getElementById('bg-image-view');
const imageTitle = document.getElementById('bg-image-title');
const imageDescription = document.getElementById('bg-image-description');

if (imageModal && imageView && imageTitle && imageDescription && bgCards.length) {
  const closeModal = () => {
    imageModal.hidden = true;
    imageView.src = '';
    imageView.alt = '';
    imageTitle.textContent = '';
    imageDescription.textContent = '';
    body.classList.remove('modal-open');
  };

  const openModal = (card) => {
    const backgroundImage = window.getComputedStyle(card).backgroundImage;
    const imageMatch = backgroundImage.match(/url\((['"]?)(.*?)\1\)/);
    const heading = card.querySelector('h3')?.textContent?.trim() || 'Background image';
    const description = Array.from(card.querySelectorAll('p'))
      .map((paragraph) => paragraph.textContent.trim())
      .filter(Boolean)
      .join(' • ');

    if (!imageMatch?.[2]) return;

    imageView.src = imageMatch[2];
    imageView.alt = heading;
    imageTitle.textContent = heading;
    imageDescription.textContent = description;
    imageModal.hidden = false;
    body.classList.add('modal-open');
  };

  bgCards.forEach((card) => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  imageModal.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-close-modal')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !imageModal.hidden) {
      closeModal();
    }
  });
}
