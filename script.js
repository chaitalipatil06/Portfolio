// Chaitali Patil · portfolio interactions
// Everything here is an enhancement: the page still works without JavaScript.

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 821px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  const toTop = document.querySelector('.to-top');
  const coffee = document.querySelector('.to-top-coffee');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
    if (!toTop) return;
    toTop.classList.toggle('show', window.scrollY > 600);
    // the mug fills with coffee as you read: empty at the top, full at the bottom
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    coffee.setAttribute('y', String(50 - progress * 28));
  };

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      // keyboard and screen reader users land back at the top too
      document.querySelector('.logo').focus({ preventScroll: true });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Project filters ---------- */
  const chips = document.querySelectorAll('.chip');
  const projects = document.querySelectorAll('.project');
  const status = document.getElementById('filter-status');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      let shown = 0;
      projects.forEach((p) => {
        const match = filter === 'all' || p.dataset.kind === filter;
        p.hidden = !match;
        if (match) { shown++; p.classList.add('is-visible'); }
      });
      if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'project' : 'projects'}.`;
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealables = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('is-visible');
          io.unobserve(el);
          // drop the stagger delay afterwards so hover effects respond instantly
          setTimeout(() => { el.style.transitionDelay = ''; }, 1000);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    // small stagger for items that sit side by side
    document.querySelectorAll('.recipe, .projects, .hobbies, .menu-list').forEach((group) => {
      group.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 90}ms`; });
    });
    revealables.forEach((el) => io.observe(el));
  }

  /* ---------- Highlight current section in nav ---------- */
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]:not(.btn)')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === `#${entry.target.id}`));
          links.forEach((a) => { if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'true'); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => navIO.observe(s));
  }
})();
