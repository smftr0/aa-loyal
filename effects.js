// Fade in on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Hero text reveal on load
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.style.opacity = '0';
  heroTitle.style.transform = 'translateY(20px)';
  heroTitle.style.transition = 'opacity 1s ease 0.3s, transform 1s ease 0.3s';
  setTimeout(() => {
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'translateY(0)';
  }, 100);
}

// Parallax on hero
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    hero.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
  });
}

// Page transition fade on link clicks
document.querySelectorAll('a').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('#') && !href.startsWith('http') && href.endsWith('.html')) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.style.transition = 'opacity 0.4s ease';
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 400);
    });
  }
});

// Formspree contact form
const form = document.getElementById('contact-form');
if (form) {
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.6';
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://formspree.io/f/xnjopgzn', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.querySelectorAll('input, textarea').forEach(el => el.value = '');
        submitBtn.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        throw new Error('Failed');
      }
    } catch {
      submitBtn.textContent = 'Send Message';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
      errorMsg.style.display = 'block';
    }
  });
}