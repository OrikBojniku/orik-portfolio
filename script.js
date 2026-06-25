/* ============================================
   ORIK BOJNIKU — PORTFOLIO SCRIPTS
   ============================================ */

// ── NAV SCROLL ──────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER MENU ──────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── TERMINAL ANIMATION ───────────────────────
const terminalOutput = document.getElementById('terminalOutput');

const lines = [
  { text: '$ kubectl get pods --namespace=prod', color: '#00CFA8' },
  { text: 'NAME                     READY   STATUS    RESTARTS', color: '#8888A8' },
  { text: 'app-deployment-7d4f9     1/1     Running   0', color: '#E8E8F0' },
  { text: '$ terraform plan -out=tfplan', color: '#00CFA8' },
  { text: 'Plan: 3 to add, 0 to change, 0 to destroy.', color: '#7B6EF6' },
  { text: '$ ansible-playbook site.yml', color: '#00CFA8' },
  { text: 'PLAY RECAP: ok=12  changed=3  failed=0', color: '#27C93F' },
  { text: '$ jenkins build local-devops-release-platform', color: '#00CFA8' },
  { text: 'BUILD SUCCESS ✓  Pipeline completed in 48s', color: '#27C93F' },
];

let lineIndex = 0;
let charIndex = 0;
let currentLineEl = null;
let isPaused = false;

function createLineElement(color) {
  const span = document.createElement('span');
  span.style.color = color;
  span.style.display = 'block';
  terminalOutput.appendChild(span);
  return span;
}

function typeNextChar() {
  if (isPaused) return;

  if (lineIndex >= lines.length) {
    // Restart after pause
    setTimeout(() => {
      terminalOutput.innerHTML = '';
      lineIndex = 0;
      charIndex = 0;
      currentLineEl = null;
      requestAnimationFrame(typeLoop);
    }, 3000);
    return;
  }

  const { text, color } = lines[lineIndex];

  if (charIndex === 0) {
    currentLineEl = createLineElement(color);
  }

  if (charIndex < text.length) {
    currentLineEl.textContent += text[charIndex];
    charIndex++;
    const delay = text[charIndex - 1] === '$' ? 80 : Math.random() * 35 + 18;
    setTimeout(typeNextChar, delay);
  } else {
    lineIndex++;
    charIndex = 0;
    const pauseDelay = lines[lineIndex - 1]?.text.startsWith('$') ? 120 : 500;
    setTimeout(typeNextChar, pauseDelay);
  }
}

function typeLoop() {
  typeNextChar();
}

// Start terminal after short delay
setTimeout(typeLoop, 800);

// Pause terminal when not visible
const terminalObserver = new IntersectionObserver((entries) => {
  isPaused = !entries[0].isIntersecting;
}, { threshold: 0.2 });

const terminalEl = document.getElementById('terminal');
if (terminalEl) terminalObserver.observe(terminalEl);


// ── SCROLL REVEAL ────────────────────────────
const revealEls = document.querySelectorAll(
  '.about__grid, .skill-group, .project-card, .timeline__item, .cert-card, .contact__wrap, .section__heading'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


// ── STAGGER REVEAL FOR GRIDS ────────────────
const staggerGroups = [
  '.skills__grid .skill-group',
  '.projects__grid .project-card',
  '.certs__grid .cert-card',
  '.timeline .timeline__item',
];

staggerGroups.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });
});


// ── ACTIVE NAV LINK ──────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));


// ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ──────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ── CURSOR BLINK on terminal ─────────────────
// Already handled via CSS animation


// ── YEAR IN FOOTER ───────────────────────────
const footerCopy = document.querySelector('.footer__copy');
if (footerCopy) {
  footerCopy.textContent = `© ${new Date().getFullYear()} Orik Bojniku. Built with care.`;
}
