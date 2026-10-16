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
          // If project-card, clear entrance transition-delay after reveal animation finishes
          if (entry.target.classList.contains('project-card')) {
            setTimeout(() => {
              entry.target.style.transitionDelay = '0s';
            }, 800);
          }
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

  // 3b. Automatic Scroll-Based Project Card Highlighting & View Management
  const projectsSection = document.getElementById('projects');
  const projectsGrid = document.querySelector('.projects-grid');
  const projectCards = Array.from(document.querySelectorAll('.projects-grid .project-card'));

  if (projectsSection && projectsGrid && projectCards.length > 0 && !prefersReducedMotion) {
    let activeCardIndex = -1;  // Tracks the project card closest to viewport center
    let hoveredCardIndex = -1; // Tracks any temporarily hovered/touched card
    let isProjectsVisible = false;
    let isTicking = false;
    let isScrolling = false;
    let scrollEndTimer = null;

    // Apply visual classes based on activeCardIndex and hoveredCardIndex
    const applyCardStates = () => {
      const isMobileView = window.matchMedia('(max-width: 767px)').matches;

      if (isMobileView) {
        // Clear desktop section-wide highlight
        projectsGrid.classList.remove('is-in-view');

        // 1. Temporary hover priority (only if not actively scrolling)
        if (hoveredCardIndex !== -1 && !isScrolling) {
          projectsGrid.classList.add('has-card-hover');
          projectCards.forEach((card, idx) => {
            card.classList.toggle('is-hovered', idx === hoveredCardIndex);
          });
        } else {
          projectsGrid.classList.remove('has-card-hover');
          projectCards.forEach(card => card.classList.remove('is-hovered'));
        }

        // 2. Continuous scroll-centered highlight
        if (activeCardIndex !== -1) {
          projectsGrid.classList.add('has-active-card');
          projectCards.forEach((card, idx) => {
            card.classList.toggle('is-active-card', idx === activeCardIndex);
          });
        } else {
          projectsGrid.classList.remove('has-active-card');
          projectCards.forEach(card => card.classList.remove('is-active-card'));
        }
      } else {
        // Laptop & Desktop View (>= 768px):
        projectsGrid.classList.remove('has-active-card');
        projectCards.forEach(card => card.classList.remove('is-active-card'));

        if (hoveredCardIndex !== -1) {
          projectsGrid.classList.add('has-card-hover');
          projectCards.forEach((card, idx) => {
            card.classList.toggle('is-hovered', idx === hoveredCardIndex);
          });
        } else {
          projectsGrid.classList.remove('has-card-hover');
          projectCards.forEach(card => card.classList.remove('is-hovered'));
        }

        if (isProjectsVisible) {
          projectsGrid.classList.add('is-in-view');
        } else {
          projectsGrid.classList.remove('is-in-view');
        }
      }
    };

    // Calculate which card is closest to the visible viewport center on mobile
    const updateCenteredCard = () => {
      isTicking = false;

      const isMobileView = window.matchMedia('(max-width: 767px)').matches;
      const secRect = projectsSection.getBoundingClientRect();
      const isSectionInWindow = secRect.top < window.innerHeight && secRect.bottom > 0;

      if (!isSectionInWindow) {
        activeCardIndex = -1;
        applyCardStates();
        return;
      }

      if (isMobileView) {
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight * 0.5;

        let minDistance = Infinity;
        let targetIndex = -1;
        const maxAllowedDist = viewportHeight * 0.45;

        projectCards.forEach((card, idx) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height * 0.5;
          const dist = Math.abs(cardCenter - viewportCenter);

          // Card must be visible and within focal center area
          if (rect.bottom > 30 && rect.top < viewportHeight - 30) {
            if (dist < minDistance && dist <= maxAllowedDist) {
              minDistance = dist;
              targetIndex = idx;
            }
          }
        });

        activeCardIndex = targetIndex;
      } else {
        activeCardIndex = -1;
      }

      applyCardStates();
    };

    const requestCardUpdate = () => {
      if (!isTicking) {
        requestAnimationFrame(updateCenteredCard);
        isTicking = true;
      }
    };

    // Card Hover & Touch Event Handlers
    projectCards.forEach((card, idx) => {
      const startHover = () => {
        if (!isScrolling) {
          hoveredCardIndex = idx;
          applyCardStates();
        }
      };

      const endHover = () => {
        if (hoveredCardIndex === idx) {
          hoveredCardIndex = -1;
          applyCardStates();
        }
      };

      card.addEventListener('pointerenter', startHover);
      card.addEventListener('pointerleave', endHover);
      card.addEventListener('mouseenter', startHover);
      card.addEventListener('mouseleave', endHover);

      // On mobile touch: tap to temporarily highlight
      card.addEventListener('touchstart', () => {
        startHover();
      }, { passive: true });
    });

    // Clear hover when tapping anywhere outside project cards
    document.addEventListener('touchstart', (e) => {
      if (!e.target.closest('.project-card')) {
        hoveredCardIndex = -1;
        applyCardStates();
      }
    }, { passive: true });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.project-card')) {
        hoveredCardIndex = -1;
        applyCardStates();
      }
    });

    // Scroll & Touchmove Handler:
    // Any scroll or finger movement IMMEDIATELY cancels hover and recalculates the centered card
    const handleScrollOrMove = () => {
      isScrolling = true;
      hoveredCardIndex = -1; // Clear any hover/touch lock immediately

      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        isScrolling = false;
        applyCardStates();
      }, 150);

      requestCardUpdate();
    };

    // IntersectionObserver to observe projects section
    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isProjectsVisible = entry.isIntersecting;
          requestCardUpdate();
        });
      }, {
        root: null,
        threshold: [0, 0.05, 0.1, 0.2, 0.5, 0.8, 1.0],
        rootMargin: '100px 0px 100px 0px'
      });
      sectionObserver.observe(projectsSection);
    } else {
      isProjectsVisible = true;
    }

    window.addEventListener('scroll', handleScrollOrMove, { passive: true });
    window.addEventListener('touchmove', handleScrollOrMove, { passive: true });
    window.addEventListener('resize', requestCardUpdate, { passive: true });
    requestCardUpdate();
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

  // 10. 3D Credentials Carousel & Certificate Lightbox Modal
  const credOuter = document.getElementById('credCarouselOuter');
  const credStage = document.getElementById('credCarouselStage');
  const credCards = document.querySelectorAll('.cred-3d-card');
  const credPrevBtn = document.getElementById('credPrevBtn');
  const credNextBtn = document.getElementById('credNextBtn');
  const credDots = document.querySelectorAll('.cred-dot-item');
  const credCounterActive = document.querySelector('.cred-index-active');
  const credCounterTotal = document.querySelector('.cred-index-total');

  const certModal = document.getElementById('certLightboxModal');
  const certOverlay = document.getElementById('certLightboxOverlay');
  const certClose = document.getElementById('certLightboxClose');
  const certTitle = document.getElementById('certLightboxTitle');
  const certIssuer = document.getElementById('certLightboxIssuer');
  const certImg = document.getElementById('certLightboxImg');
  const certOpenTab = document.getElementById('certLightboxOpenTab');
  const viewCertBtns = document.querySelectorAll('.btn-cred-view-cert');
  const thumbContainers = document.querySelectorAll('.cred-thumb-container');

  if (credCards.length > 0) {
    let currentCredIndex = 0;
    const totalCreds = credCards.length;

    // Set initial total count
    if (credCounterTotal) {
      credCounterTotal.textContent = String(totalCreds).padStart(2, '0');
    }

    const updateCredentialsCarousel = (newIndex) => {
      // Circular wrapping
      currentCredIndex = ((newIndex % totalCreds) + totalCreds) % totalCreds;

      credCards.forEach((card, idx) => {
        // Reset all placement classes
        card.classList.remove(
          'card-active',
          'card-prev',
          'card-next',
          'card-hidden-left',
          'card-hidden-right'
        );

        // Calculate circular shortest offset relative to current card
        let offset = idx - currentCredIndex;
        while (offset > totalCreds / 2) offset -= totalCreds;
        while (offset < -totalCreds / 2) offset += totalCreds;

        if (offset === 0) {
          card.classList.add('card-active');
          card.setAttribute('aria-hidden', 'false');
        } else if (offset === -1) {
          card.classList.add('card-prev');
          card.setAttribute('aria-hidden', 'true');
        } else if (offset === 1) {
          card.classList.add('card-next');
          card.setAttribute('aria-hidden', 'true');
        } else if (offset < -1) {
          card.classList.add('card-hidden-left');
          card.setAttribute('aria-hidden', 'true');
        } else {
          card.classList.add('card-hidden-right');
          card.setAttribute('aria-hidden', 'true');
        }
      });

      // Update Pagination Dots
      credDots.forEach((dot, idx) => {
        const isActive = idx === currentCredIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update Number Indicator
      if (credCounterActive) {
        credCounterActive.textContent = String(currentCredIndex + 1).padStart(2, '0');
      }
    };

    // Navigation Arrow Buttons
    if (credPrevBtn) {
      credPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCredentialsCarousel(currentCredIndex - 1);
      });
    }

    if (credNextBtn) {
      credNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCredentialsCarousel(currentCredIndex + 1);
      });
    }

    // Pagination Dots Click
    credDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          updateCredentialsCarousel(idx);
        }
      });
    });

    // Click Neighboring Cards to Select Them
    credCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        // If clicking on a button or link inside the card, don't slide
        if (e.target.closest('button') || e.target.closest('a')) {
          return;
        }

        if (card.classList.contains('card-prev')) {
          updateCredentialsCarousel(currentCredIndex - 1);
        } else if (card.classList.contains('card-next')) {
          updateCredentialsCarousel(currentCredIndex + 1);
        }
      });
    });

    // Keyboard Navigation (ArrowLeft / ArrowRight)
    if (credOuter) {
      credOuter.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          updateCredentialsCarousel(currentCredIndex - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          updateCredentialsCarousel(currentCredIndex + 1);
        }
      });
    }

    // Mobile / Tablet Touch Swipe Support
    if (credStage) {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      credStage.addEventListener(
        'touchstart',
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
          touchStartY = e.changedTouches[0].screenY;
        },
        { passive: true }
      );

      credStage.addEventListener(
        'touchend',
        (e) => {
          touchEndX = e.changedTouches[0].screenX;
          touchEndY = e.changedTouches[0].screenY;
          handleSwipeGesture();
        },
        { passive: true }
      );

      const handleSwipeGesture = () => {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const swipeThreshold = 40;

        if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            // Swiped left -> next card
            updateCredentialsCarousel(currentCredIndex + 1);
          } else {
            // Swiped right -> previous card
            updateCredentialsCarousel(currentCredIndex - 1);
          }
        }
      };
    }

    // Initialize 3D Carousel
    updateCredentialsCarousel(0);
  }

  // Certificate Lightbox Modal Handling
  const openCertificateModal = ({ title, issuer, imgUrl }) => {
    if (!certModal) return;

    if (certTitle) certTitle.textContent = title || 'Certificate Preview';
    if (certIssuer) certIssuer.textContent = issuer || 'Issuing Body';

    if (certImg) {
      certImg.src = imgUrl || '';
      certImg.alt = `${title} Certificate Preview`;
    }

    if (certOpenTab) {
      certOpenTab.href = imgUrl || '#';
    }

    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCertificateModal = () => {
    if (!certModal) return;
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Connect "View Certificate" buttons
  viewCertBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const title = btn.getAttribute('data-cert-title');
      const issuer = btn.getAttribute('data-cert-issuer');
      const imgUrl = btn.getAttribute('data-cert-img');

      openCertificateModal({ title, issuer, imgUrl });
    });
  });

  // Clicking thumbnail directly on active card also opens preview
  thumbContainers.forEach((container) => {
    container.addEventListener('click', (e) => {
      const card = container.closest('.cred-3d-card');
      if (card && card.classList.contains('card-active')) {
        const btn = card.querySelector('.btn-cred-view-cert');
        if (btn) {
          btn.click();
        }
      }
    });
  });

  if (certClose) {
    certClose.addEventListener('click', closeCertificateModal);
  }

  if (certOverlay) {
    certOverlay.addEventListener('click', closeCertificateModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('open')) {
      closeCertificateModal();
    }
  });
});
