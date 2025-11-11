// assets/js/main.js

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.add(savedTheme);

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    body.classList.replace('light', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.replace('dark', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Dynamic Time Update
function updateTime() {
  const timeElement = document.querySelector('.time strong');
  if (timeElement) {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Phnom_Penh'
    };
    const formattedTime = now.toLocaleString('en-US', options) + ' (+07)';
    timeElement.textContent = formattedTime;
  }
}

updateTime();
setInterval(updateTime, 60000);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade-In on Load
window.addEventListener('load', () => {
  document.querySelector('.hero-inner').style.opacity = 1;
});

// Typing Animation for Name (simple pure JS)
const nameElement = document.querySelector('.name');
if (nameElement) {
  const text = nameElement.textContent;
  nameElement.textContent = '';
  let i = 0;
  const typingInterval = setInterval(() => {
    if (i < text.length) {
      nameElement.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100);
}

// Parallax Effect on Hero (simple)
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrollPos = window.scrollY;
  hero.style.backgroundPositionY = `${scrollPos * 0.5}px`;
});

// Additional Text Animation Trigger
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.title');
  const desc = document.querySelector('.desc');
  if (title) title.style.animationPlayState = 'running';
  if (desc) desc.style.animationPlayState = 'running';
});