// assets/js/skills.js

// Mobile Nav Toggle
const navMob = document.querySelector('.nav-mob');
const navLinks = document.querySelector('.nav-links');

navMob.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Dynamic Time Update
function updateTime() {
  const timeElement = document.querySelector('.time');
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
    const formattedTime = `Last Updated: ${now.toLocaleString('en-US', options)} (+07)`;
    timeElement.textContent = formattedTime;
  }
}

updateTime();
setInterval(updateTime, 60000);

// Fade-In on Load for Sections
window.addEventListener('load', () => {
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 1;
    section.style.transition = 'opacity 1s ease-out';
  });
});

// Intersection Observer for Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.tech, .soft, .stats').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Add this to CSS if not there: .fade-in { opacity: 0; transition: opacity 1s ease-out; } .fade-in.visible { opacity: 1; }

// Animate Progress Bars
const progObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const prog = entry.target;
      const width = prog.getAttribute('data-width');
      prog.style.width = width;
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.prog').forEach(prog => {
  prog.style.transition = 'width 1s ease-out';
  progObserver.observe(prog);
});