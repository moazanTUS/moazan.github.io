// Mobile nav toggle
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
navToggle?.addEventListener('click', () => nav.classList.toggle('open'));

// Smooth scroll and active link
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
      nav.classList.remove('open');
    }
  });
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form (no backend) -> show confirmation only
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm).entries());
  console.log('Message (not sent; demo only):', data);
  formNote.textContent = 'Message sent! I will get back to you soon.';
  contactForm.reset();
  setTimeout(() => formNote.textContent = '', 5000);
});

// Fade-up animation for project cards
const cards = document.querySelectorAll('.fade-up');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
cards.forEach(c => io.observe(c));

// 🖼️ Multiple Project Galleries
const galleries = {
  noor: {
    title: "Noor Events Website",
    images: ["assets/noor1.png", "assets/noor2.png", "assets/noor3.png", "assets/noor4.png"]
  },
  healthco: {
    title: "Health Co. Gym App",
    images: ["assets/healthcothumb.png", "assets/healthco1.png", "assets/healthco2.png", "assets/healthco3.png"]
  },
  athlete: {
    title: "Athlete Powerlifting Data System",
    images: ["assets/athlete.png"]
  },
  puzzler: {
    title: "Puzler Game",
    images: ["assets/puzzler1.png", "assets/puzzler2.png", "assets/puzzler3.png", "assets/puzzler4.png"]
  },
  // Add more galleries here easily
};

const modal = document.getElementById('galleryModal');
const titleEl = document.getElementById('gm-title');
const imgEl = document.getElementById('gm-image');
const thumbsWrap = document.getElementById('gm-thumbs');
const countEl = document.getElementById('gm-count');
const closeBtn = document.querySelector('.gm-close');
const prevBtn = document.querySelector('.gm-nav.prev');
const nextBtn = document.querySelector('.gm-nav.next');

let currentGallery = null;
let idx = 0;

// Create gallery thumbs dynamically
function openGallery(name) {
  currentGallery = galleries[name];
  if (!currentGallery) return;

  titleEl.textContent = currentGallery.title;
  thumbsWrap.innerHTML = '';
  currentGallery.images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.dataset.idx = i;
    img.alt = `thumb ${i + 1}`;
    img.addEventListener('click', () => updateGallery(i));
    thumbsWrap.appendChild(img);
  });

  updateGallery(0);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateGallery(i) {
  if (!currentGallery) return;
  if (i < 0) i = currentGallery.images.length - 1;
  if (i >= currentGallery.images.length) i = 0;
  idx = i;
  imgEl.src = currentGallery.images[idx];
  countEl.textContent = `Image ${idx + 1} of ${currentGallery.images.length}`;
  thumbsWrap.querySelectorAll('img').forEach(t => t.classList.remove('active'));
  thumbsWrap.querySelectorAll('img')[idx].classList.add('active');
}

document.querySelectorAll('[data-gallery]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const name = btn.getAttribute('data-gallery');
    openGallery(name);
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
});

modal.addEventListener('click', e => {
  if (e.target.classList.contains('gm-backdrop')) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
});

prevBtn.addEventListener('click', () => updateGallery(idx - 1));
nextBtn.addEventListener('click', () => updateGallery(idx + 1));

