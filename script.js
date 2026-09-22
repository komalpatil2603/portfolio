/* =========================================================
   PORTFOLIO SCRIPT — Komal Mahesh Patil
   Vanilla JS only: mobile nav toggle, active-link highlighting,
   footer year, and basic contact form handling.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile hamburger menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close the mobile menu after a nav link is tapped
  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Highlight the nav link for the section in view ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let currentId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 96; // offset for sticky header
      if (window.scrollY >= sectionTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', highlightNav);
  highlightNav();

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Contact form ---------- */
  // Note: this is front-end only. To actually receive messages, connect
  // this form to a backend or a service like Formspree / Netlify Forms
  // (see the hosting instructions provided alongside this file).
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields before sending.';
      return;
    }

    // Placeholder success behavior — replace with a real submission
    // (e.g. fetch() to Formspree/Netlify Forms) when you host the site.
    formStatus.textContent = `Thanks, ${name}! Your message has been noted.`;
    contactForm.reset();
    launchConfetti();
  });

  /* =========================================================
     FUN ANIMATIONS
     ========================================================= */

  /* ---------- Scroll progress bar ---------- */
  const scrollProgress = document.getElementById('scrollProgress');

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${percent}%`;
  };

  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();

  /* ---------- Typing effect for hero tagline ---------- */
  const heroTagline = document.getElementById('heroTagline');
  const taglineText = "B.Tech student in AI & Data Science, building a strong foundation in machine learning while sharpening practical, real-world engineering skills.";
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroTagline) {
    if (prefersReducedMotion) {
      heroTagline.textContent = taglineText;
    } else {
      let charIndex = 0;
      const cursorSpan = document.createElement('span');
      cursorSpan.className = 'typing-cursor';
      cursorSpan.textContent = '\u00A0';

      const typeNextChar = () => {
        if (charIndex < taglineText.length) {
          heroTagline.textContent = taglineText.slice(0, charIndex + 1);
          heroTagline.appendChild(cursorSpan);
          charIndex++;
          setTimeout(typeNextChar, 18);
        }
      };
      typeNextChar();
    }
  }

  /* ---------- Reveal sections on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => revealObserver.observe(el));

    /* ---------- Staggered skill tag pop-in ---------- */
    const skillTags = document.querySelectorAll('.skill-tag');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tagsInGroup = entry.target.parentElement.querySelectorAll('.skill-tag');
          tagsInGroup.forEach((tag, i) => {
            setTimeout(() => tag.classList.add('is-visible'), i * 90);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-tags').forEach((group) => skillObserver.observe(group));
  } else {
    // Fallback: just show everything if IntersectionObserver isn't supported
    revealEls.forEach((el) => el.classList.add('is-visible'));
    document.querySelectorAll('.skill-tag').forEach((tag) => tag.classList.add('is-visible'));
  }

  /* ---------- Project card 3D tilt on mouse move ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ---------- Cursor glow (desktop only) ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  /* ---------- Confetti burst ---------- */
  function launchConfetti() {
    if (prefersReducedMotion) return;

    const colors = ['#E88FA2', '#F7B8C4', '#FFD9B3', '#B8E8D4', '#4A3B5E'];
    const pieceCount = 60;

    for (let i = 0; i < pieceCount; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      const duration = 2 + Math.random() * 1.5;
      piece.style.animationDuration = `${duration}s`;
      piece.style.animationDelay = `${Math.random() * 0.3}s`;
      document.body.appendChild(piece);

      setTimeout(() => piece.remove(), (duration + 0.3) * 1000);
    }
  }

});
