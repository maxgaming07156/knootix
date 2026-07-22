// ============================================
// KNOOTIX — Premium Interactive Scripts
// ============================================

// --- Theme Toggle ---
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  if (icon) icon.textContent = isDark ? '🌙' : '☀️';
  if (label) label.textContent = isDark ? 'Dark' : 'Light';
  localStorage.setItem('knootix-theme', isDark ? 'light' : 'dark');
}

// Restore saved theme
(function() {
  const saved = localStorage.getItem('knootix-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    if (saved === 'light') {
      if (icon) icon.textContent = '🌙';
      if (label) label.textContent = 'Dark';
    }
  }
})();

// --- Mobile Menu ---
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.remove('open');
  document.body.style.overflow = '';
}

// --- Active Nav Link ---
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
})();

// --- Navbar Scroll Effects ---
(function() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });
})();

// --- Scroll Reveal (Enhanced) ---
(function() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
})();

// --- Counter Animation ---
function animateCount(el, target, suffix = '') {
  let current = 0;
  const duration = 1500;
  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    current = Math.floor(target * easeOutCubic(progress));
    el.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }
  
  requestAnimationFrame(update);
}

// Trigger counters on scroll
(function() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCount(el, target, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => counterObserver.observe(el));
})();

// --- Mouse Parallax (Hero) ---
(function() {
  const heroVisual = document.getElementById('heroVisual');
  if (!heroVisual) return;

  const floatCards = heroVisual.querySelectorAll('[data-parallax]');
  const showcaseMain = heroVisual.querySelector('.hero-showcase-main');

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    floatCards.forEach(card => {
      const speed = parseFloat(card.dataset.parallax) * 40;
      const tx = x * speed;
      const ty = y * speed;
      card.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    if (showcaseMain) {
      const rx = y * 3;
      const ry = x * -3;
      showcaseMain.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  });
})();

// --- FAQ Accordion ---
// Toggle is handled via onclick in HTML: onclick="this.classList.toggle('active')"
// Also handle service page FAQ items
document.querySelectorAll('.svc-faq-item').forEach(item => {
  item.addEventListener('click', () => {
    // Close others
    item.parentElement.querySelectorAll('.svc-faq-item').forEach(other => {
      if (other !== item) other.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

// --- Card Tilt Effect ---
(function() {
  const tiltCards = document.querySelectorAll('.featured-card, .svc-portfolio-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = y * -6;
      const ry = x * 6;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// --- Lazy Load Images ---
(function() {
  if ('loading' in HTMLImageElement.prototype) return; // Native lazy loading supported
  
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
})();

// --- Form Submit (Web3Forms) ---
async function handleFormSubmit() {
  const name = document.getElementById('cfName')?.value.trim();
  const email = document.getElementById('cfEmail')?.value.trim();
  const service = document.getElementById('cfService')?.value;
  const msg = document.getElementById('cfMessage')?.value.trim();
  const status = document.getElementById('formStatus');
  const submitBtn = document.querySelector('.submit-btn');

  if (!name || !email || !msg || !service) {
    if (status) {
      status.style.display = 'block';
      status.style.background = 'rgba(255,80,80,0.1)';
      status.style.border = '1px solid rgba(255,80,80,0.3)';
      status.style.color = '#ff8080';
      status.textContent = '⚠️ Please fill in all required fields.';
    }
    return;
  }

  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.style.opacity = '0.7';
  submitBtn.disabled = true;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'db4ec93b-2da2-4505-911e-2a30f8195bf8',
        subject: 'New Contact Form Submission - Knootix Website',
        Name: name,
        Email: email,
        Service: service,
        Message: msg
      })
    });

    const result = await response.json();

    if (result.success) {
      status.style.display = 'block';
      status.style.background = 'var(--accent-glow)';
      status.style.border = '1px solid rgba(77,184,138,0.3)';
      status.style.color = 'var(--accent)';
      status.textContent = '✓ Message sent successfully! We\'ll be in touch soon.';

      document.getElementById('cfName').value = '';
      document.getElementById('cfEmail').value = '';
      document.getElementById('cfService').value = '';
      document.getElementById('cfMessage').value = '';
    } else {
      throw new Error('Failed to send');
    }
  } catch (error) {
    if (status) {
      status.style.display = 'block';
      status.style.background = 'rgba(255,80,80,0.1)';
      status.style.border = '1px solid rgba(255,80,80,0.3)';
      status.style.color = '#ff8080';
      status.textContent = '⚠️ Something went wrong. Please try again.';
    }
  } finally {
    submitBtn.textContent = originalBtnText;
    submitBtn.style.opacity = '1';
    submitBtn.disabled = false;
    setTimeout(() => {
      if (status) status.style.display = 'none';
    }, 5000);
  }
}

// --- AI Chat ---
function sendChat() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  const messages = document.getElementById('chatMessages');
  if (!messages) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'msg user';
  userMsg.textContent = text;
  messages.appendChild(userMsg);

  const typingMsg = document.createElement('div');
  typingMsg.className = 'msg bot typing';
  typingMsg.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  messages.appendChild(typingMsg);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    typingMsg.remove();
    let reply = 'Thanks for reaching out! You can drop an email at knootix@gmail.com or hit our WhatsApp for an immediate response.';
    const lowerText = text.toLowerCase();

    if (lowerText.includes('service') || lowerText.includes('offer') || lowerText.includes('do you do')) {
      reply = 'We offer Video Editing, Graphic Design, Website Development, and Photography. Let us know which one you need help with!';
    } else if (lowerText.includes('video') || lowerText.includes('edit')) {
      reply = 'Our video editing covers brand films, cinematic reels, color grading, and VFX overlays for all social platforms.';
    } else if (lowerText.includes('design') || lowerText.includes('graphic') || lowerText.includes('logo')) {
      reply = 'For Graphic Design, we create brand identities, logos, marketing collateral, and full visual systems.';
    } else if (lowerText.includes('web') || lowerText.includes('site') || lowerText.includes('e-com') || lowerText.includes('develop')) {
      reply = 'We build custom, responsive websites, landing pages, and robust E-commerce platforms optimized for SEO.';
    } else if (lowerText.includes('photo') || lowerText.includes('shoot')) {
      reply = 'Our photography services range from product and commercial shoots to corporate headshots and event coverage.';
    } else if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('quote')) {
      reply = 'Pricing varies depending on your exact project scope. Please use the contact form and we\'ll get you a custom quote ASAP!';
    } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      reply = 'Hello there! How can we help your brand stand out today?';
    }

    const botMsg = document.createElement('div');
    botMsg.className = 'msg bot';
    botMsg.textContent = reply;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}
