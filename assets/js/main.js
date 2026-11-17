/* ==========================================================================
   Rene VA Services – site interactions (vanilla ES6, no dependencies
   beyond the local Bootstrap bundle for collapse/dropdown).
   ========================================================================== */
(() => {
  'use strict';

  const doc = document.documentElement;
  doc.classList.add('js');

  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');
  const navCollapseEl = document.getElementById('mainNav');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky header shadow + back-to-top visibility ---------- */
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 10);
    if (backToTop) backToTop.classList.toggle('show', y > 600);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Smooth scrolling for in-page links ---------- */
  const getHeaderOffset = () => (header ? header.getBoundingClientRect().height : 0);

  // Offsetting is handled by CSS `scroll-padding-top` (sized to the compact
  // sticky header), so the result is right even while the mobile menu collapses.
  const scrollToTarget = (target) => {
    target.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
  };

  const collapseMobileNav = () => {
    if (!navCollapseEl || !navCollapseEl.classList.contains('show') || !window.bootstrap) return;
    window.bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false }).hide();
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    // The Services toggle opens its dropdown rather than scrolling.
    if (link.matches('[data-bs-toggle="dropdown"]')) { event.preventDefault(); return; }

    const hash = link.getAttribute('href');
    if (hash === '#' || hash.length < 2) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    event.preventDefault();

    // The open mobile menu sits inside the in-flow sticky header, so collapsing it
    // shifts the page. Scroll only once it has finished closing.
    if (navCollapseEl && navCollapseEl.classList.contains('show') && window.bootstrap) {
      navCollapseEl.addEventListener('hidden.bs.collapse', () => scrollToTarget(target), { once: true });
      collapseMobileNav();
    } else {
      scrollToTarget(target);
    }

    if (history.pushState) history.pushState(null, '', hash);

    // Move focus for keyboard and screen-reader users without a second jump.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  /* ---------- Back to top ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
      const brand = document.querySelector('.navbar-brand');
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  /* ---------- Close mobile nav with Escape ---------- */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navCollapseEl && navCollapseEl.classList.contains('show')) {
      collapseMobileNav();
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.focus();
    }
  });

  /* ---------- Active navigation highlighting ---------- */
  const navLinks = Array.from(document.querySelectorAll('#mainNav .nav-link[href^="#"]'));
  const sectionIds = navLinks.map((a) => a.getAttribute('href').slice(1));
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((a) => {
      const isActive = a.getAttribute('href') === `#${id}`;
      a.classList.toggle('active', isActive);
      if (isActive) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  const updateActive = () => {
    const probe = getHeaderOffset() + window.innerHeight * 0.3;
    let current = sections[0] ? sections[0].id : '';
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= probe) current = section.id;
    });
    // Bottom of page: highlight the last section (contact).
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4 && sections.length) {
      current = sections[sections.length - 1].id;
    }
    setActive(current);
  };

  let activeTicking = false;
  window.addEventListener('scroll', () => {
    if (!activeTicking) {
      window.requestAnimationFrame(() => { updateActive(); activeTicking = false; });
      activeTicking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateActive);
  updateActive();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    // Stagger siblings within the same row for a gentle cascade.
    revealEls.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal')) : [];
      const index = siblings.indexOf(el);
      if (index > 0) el.style.transitionDelay = `${Math.min(index, 5) * 80}ms`;
      observer.observe(el);
    });
  }
})();
