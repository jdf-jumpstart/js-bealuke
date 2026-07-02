// Header scroll state
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
navToggle.addEventListener('click', () => {
  const open = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
primaryNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal-on-scroll for section heads and cards
const revealTargets = document.querySelectorAll(
  '.section-head, .service-group, .concierge-card, .philosophy-inner, .about-inner, .contact-inner'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => io.observe(el));

// Contact form — placeholder submit handling (no backend wired up)
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const original = button.textContent;
  button.textContent = 'Thank you — we\'ll be in touch';
  button.disabled = true;
  setTimeout(() => {
    form.reset();
    button.textContent = original;
    button.disabled = false;
  }, 3200);
});
