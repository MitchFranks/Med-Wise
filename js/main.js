document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  updateNavAuth();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 10);
  }, { passive: true });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menuBtn.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  if (!fadeElements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    fadeElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeElements.forEach(el => observer.observe(el));
}

function updateNavAuth() {
  if (typeof MedWiseProgress === 'undefined') return;
  const loggedIn = MedWiseProgress.isLoggedIn();

  document.querySelectorAll('.nav-actions').forEach(actions => {
    const signInLink = actions.querySelector('a[href="signin.html"]');
    const registerLink = actions.querySelector('a[href="register.html"]');
    const accountLink = actions.querySelector('a[href="account.html"]');

    if (loggedIn) {
      if (signInLink) signInLink.style.display = 'none';
      if (registerLink) {
        registerLink.href = 'account.html';
        registerLink.textContent = 'My Progress';
      }
      if (accountLink) accountLink.style.display = '';
    }
  });

  const mobileNav = document.getElementById('mobileNav');
  if (!mobileNav) return;
  const mobileActions = mobileNav.querySelector('.nav-actions');
  if (!mobileActions) return;

  if (loggedIn) {
    const signIn = mobileActions.querySelector('a[href="signin.html"]');
    const register = mobileActions.querySelector('a[href="register.html"]');
    if (signIn) signIn.style.display = 'none';
    if (register) {
      register.href = 'account.html';
      register.textContent = 'My Progress';
      register.className = 'btn btn-primary';
    }
  }
}

function filterContent(type, clickedBtn) {
  const grid = document.getElementById('contentGrid');
  if (!grid) return;

  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  clickedBtn.classList.add('active');

  grid.querySelectorAll('.content-card').forEach(card => {
    const cardType = card.getAttribute('data-type');
    if (type === 'all' || cardType === type) {
      card.style.display = '';
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      requestAnimationFrame(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      setTimeout(() => { card.style.display = 'none'; }, 300);
    }
  });
}
