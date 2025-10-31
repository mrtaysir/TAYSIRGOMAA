const body = document.body;
const darkToggle = document.getElementById('darkModeToggle');
const yearEl = document.getElementById('year');

if (yearEl) yearEl.textContent = new Date().getFullYear();

// Restore saved mode
const saved = localStorage.getItem('darkMode');
if (saved === 'light') body.classList.add('light-mode');

function updateIcon() {
  const isLight = body.classList.contains('light-mode');
  const sun = darkToggle?.querySelectorAll('.sun, .sun-ray');
  const moon = darkToggle?.querySelector('.moon');
  if (!sun || !moon) return;
  sun.forEach(s => s.style.display = isLight ? 'none' : 'block');
  moon.style.display = isLight ? 'block' : 'none';
}
updateIcon();

darkToggle?.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  localStorage.setItem('darkMode', body.classList.contains('light-mode') ? 'light' : 'dark');
  updateIcon();
});

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.getAttribute('data-filter');
    items.forEach(it => {
      const ok = f === 'all' || it.getAttribute('data-category') === f;
      it.style.display = ok ? 'block' : 'none';
    });
  });
});

// Smooth scroll and active nav
document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('.nav a');
  let current = '';
  sections.forEach(s => { if (pageYOffset >= s.offsetTop - 120) current = s.id; });
  links.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === `#${current}`); });
});

// Contact form
const form = document.getElementById('contactForm');
form?.addEventListener('submit', e => {
  e.preventDefault();
  alert('تم إرسال رسالتك بنجاح!');
  form.reset();
});