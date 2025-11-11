// assets/js/about.js

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

// Mobile Nav Toggle
const navMob = document.querySelector('.nav-mob');
const navLinks = document.querySelector('.nav-links');

navMob.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fade-In on Load for Sections
window.addEventListener('load', () => {
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 1;
    section.style.transition = 'opacity 1s ease-out';
  });
});

// Optional: Intersection Observer for Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.info, .bg, .certs, .hobbies, .dream').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Add this to CSS if not there: .fade-in { opacity: 0; transition: opacity 1s ease-out; } .fade-in.visible { opacity: 1; }