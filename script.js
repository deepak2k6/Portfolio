/* ============================
   Student Portfolio — JavaScript
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loading Screen ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });
  // Fallback: hide after 3s
  setTimeout(() => loader.classList.add('hidden'), 3000);

  /* ---------- Theme Toggle ---------- */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = themeBtn.querySelector('i');
  const saved = localStorage.getItem('portfolio-theme');

  // Apply saved theme or default to dark
  if (saved) {
    html.setAttribute('data-theme', saved);
  }
  updateThemeIcon();

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    themeIcon.className = isDark ? 'bx bx-moon' : 'bx bx-sun';
  }

  /* ---------- Mobile Menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Typing Effect ---------- */
  const typingEl = document.getElementById('typingText');
  const titles = ['ECE Student', 'Web Developer', 'PCB Design Beginner', 'VLSI Design Aspirant', 'IoT Enthusiast', 'RF & Antenna Design Enthusiast'];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = titles[titleIndex];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex--);
    } else {
      typingEl.textContent = current.substring(0, charIndex++);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length + 1) {
      speed = 1800; // Pause before deleting
      isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      speed = 400; // Pause before next word
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

  /* ---------- Active Nav on Scroll ---------- */
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  function highlightNav() {
    let scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });

    // Navbar scroll effect
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', highlightNav);

  /* ---------- Scroll Reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Animate skill progress bars inside revealed cards
        entry.target.querySelectorAll('.progress').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width') + '%';
        });
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Scroll to Top ---------- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Contact Form Validation ---------- */
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let valid = true;

  // Reset errors
  document.querySelectorAll('.error-msg').forEach(el => {
    el.textContent = '';
  });

  // Name
  if (nameInput.value.trim().length < 2) {
    document.getElementById('nameError').textContent =
      'Please enter your name.';
    valid = false;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value.trim())) {
    document.getElementById('emailError').textContent =
      'Please enter a valid email.';
    valid = false;
  }

  // Subject
  if (subjectInput.value.trim().length < 2) {
    document.getElementById('subjectError').textContent =
      'Please enter a subject.';
    valid = false;
  }

  // Message
  if (messageInput.value.trim().length < 10) {
    document.getElementById('messageError').textContent =
      'Message must be at least 10 characters.';
    valid = false;
  }

  // Stop if validation failed
  if (!valid) {
    return;
  }

  // Send form to Web3Forms
  try {
    const formData = new FormData(form);

    const response = await fetch(
      'https://api.web3forms.com/submit',
      {
        method: 'POST',
        body: formData
      }
    );

    const data = await response.json();

    if (data.success) {
      formSuccess.innerHTML =
        "<i class='bx bx-check-circle'></i> Message sent successfully!";

      formSuccess.classList.remove('hidden');

      // Clear the form
      form.reset();

    } else {
      formSuccess.innerHTML =
        "<i class='bx bx-error-circle'></i> Something went wrong. Please try again.";

      formSuccess.classList.remove('hidden');
    }

  } catch (error) {
    formSuccess.innerHTML =
      "<i class='bx bx-error-circle'></i> Unable to send message. Please try again.";

    formSuccess.classList.remove('hidden');
  }
});
});
