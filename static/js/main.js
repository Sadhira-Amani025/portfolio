/**
 * Sadhira Amani - Personal Portfolio Script
 * Interactive behaviors, navigation scrollspy, IntersectionObserver reveals,
 * skill category filters, mail composer, and copy-to-clipboard.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elements
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
  const copyToast = document.getElementById('copyToast');
  const emailComposerForm = document.getElementById('emailComposerForm');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const categoryBlocks = document.querySelectorAll('.skill-category-block');
  const pageLoader = document.getElementById('pageLoader');
  const loaderBar = document.getElementById('loaderBar');

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Page Loading Animation
  const handlePageLoad = () => {
    if (loaderBar) {
      loaderBar.style.width = '100%';
    }
    setTimeout(() => {
      document.body.classList.remove('page-preload');
      document.body.classList.add('page-loaded');
      if (pageLoader) {
        pageLoader.classList.add('loaded');
      }
    }, 250);
  };

  if (document.readyState === 'complete') {
    handlePageLoad();
  } else {
    window.addEventListener('load', handlePageLoad);
    // Safety fallback in case load event takes longer
    setTimeout(handlePageLoad, 600);
  }

  // 3. Scroll Reveal via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Reveal everything immediately if user prefers reduced motion or no observer support
    revealElements.forEach(el => el.classList.add('is-revealed'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Only animate once when entering viewport
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 4. Header Scroll Effect & Scrollspy
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy for active nav link
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const navBackdrop = document.getElementById('mobileNavBackdrop');

  // 5. Mobile Navigation Functions
  const openMenu = () => {
    if (!navToggle || !navMenu) return;
    navToggle.classList.add('open');
    navMenu.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };

  const closeMenu = () => {
    if (!navToggle || !navMenu) return;
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMenu);
    }

    // Close menu when clicking any link inside menu
    const menuItems = navMenu.querySelectorAll('a');
    menuItems.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // 6. Copy Email to Clipboard
  const showToast = (message = 'Email copied to clipboard!') => {
    if (!copyToast) return;
    copyToast.textContent = `✓ ${message}`;
    copyToast.classList.add('show');
    setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2800);
  };

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'amanisadhira64@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(() => showToast('Email copied to clipboard!'))
          .catch(() => {
            prompt('Copy this email:', email);
          });
      } else {
        prompt('Copy this email:', email);
      }
    });
  });

  // 7. Quick Email Composer (Pre-fills and launches user's default email client)
  if (emailComposerForm) {
    emailComposerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName')?.value.trim() || '';
      const email = document.getElementById('senderEmail')?.value.trim() || '';
      const subject = document.getElementById('emailSubject')?.value.trim() || 'Portfolio Inquiry / Job Opportunity';
      const message = document.getElementById('emailMessage')?.value.trim() || '';

      const recipient = 'amanisadhira64@gmail.com';
      const formattedBody = `Hello Sadhira,\n\n${message}\n\nBest regards,\n${name}${email ? ` (${email})` : ''}`;

      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;

      // Open email client
      window.location.href = mailtoUrl;

      showToast('Opening your email client...');
    });
  }

  // 8. Skill Category Filter
  if (filterBtns.length > 0 && categoryBlocks.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-category');

        categoryBlocks.forEach(block => {
          const blockCat = block.getAttribute('data-category');
          if (selectedCategory === 'all' || blockCat === selectedCategory) {
            block.style.display = 'block';
            block.classList.add('is-revealed');
            setTimeout(() => {
              block.style.opacity = '1';
            }, 10);
          } else {
            block.style.display = 'none';
            block.style.opacity = '0';
          }
        });
      });
    });
  }

  // 9. Back to Top Button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
