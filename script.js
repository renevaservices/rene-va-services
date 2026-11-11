document.addEventListener('DOMContentLoaded', () => {

  /* Mobile Nav */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  /* Header shadow on scroll */
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20 ? '0 4px 20px rgba(0,0,0,0.15)' : 'none';
  });

  /* Contact Form Validation */
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  const status = document.getElementById('form-status');

  const validators = {
    name: (v) => v.trim().length >= 2 ? '' : 'Please enter your full name (at least 2 characters).',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    service: (v) => v ? '' : 'Please select a service.',
    subject: (v) => v.trim().length >= 3 ? '' : 'Please enter a subject (at least 3 characters).',
    message: (v) => v.trim().length >= 10 ? '' : 'Please enter a message (at least 10 characters).'
  };

  function showError(field, msg) {
    const group = document.getElementById(field).closest('.form-group');
    const errorEl = document.querySelector(`[data-error-for="${field}"]`);
    if (msg) {
      group.classList.add('invalid');
      errorEl.textContent = msg;
    } else {
      group.classList.remove('invalid');
      errorEl.textContent = '';
    }
  }

  Object.keys(validators).forEach(field => {
    const el = document.getElementById(field);
    el.addEventListener('blur', () => showError(field, validators[field](el.value)));
    el.addEventListener('input', () => {
      if (el.closest('.form-group').classList.contains('invalid')) {
        showError(field, validators[field](el.value));
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    let hasError = false;
    Object.keys(validators).forEach(field => {
      const el = document.getElementById(field);
      const msg = validators[field](el.value);
      showError(field, msg);
      if (msg) hasError = true;
    });

    if (hasError) {
      status.className = 'form-status error';
      status.textContent = 'Please correct the errors above and try again.';
      return;
    }

    submitBtn.disabled = true;
    btnText.hidden = true;
    btnLoader.hidden = false;

    setTimeout(() => {
      submitBtn.disabled = false;
      btnText.hidden = false;
      btnLoader.hidden = true;
      status.className = 'form-status success';
      status.textContent = '✓ Thank you! Your message has been sent. I will get back to you within 24 hours.';
      form.reset();
      Object.keys(validators).forEach(f => showError(f, ''));
    }, 1500);
  });

  /* Footer year */
  document.getElementById('year').textContent = new Date().getFullYear();
});