const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const revealItems = document.querySelectorAll('.reveal');
const galleryGrid = document.querySelector('.gallery-grid');
const galleryPhotoFiles = [
  'WhatsApp Image 2026-11-09 at 16.08.34.jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.35 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.35.jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.36 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.36.jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.37 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.37 (2).jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.37.jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.38 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.38.jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.39 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.39 (2).jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.39.jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.40 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.40 (2).jpeg',
  'WhatsApp Image 2026-11-09 at 16.08.40.jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.33 (2).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.33.jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.33 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.31 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.31 (2).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.31.jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.30 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.30 (2).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.30.jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.29 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.29 (2).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.29.jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.28 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.28.jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.27 (2).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.27.jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.32 (1).jpeg',
  'WhatsApp Image 2026-11-09 at 16.17.32.jpeg',
  'WhatsApp Image 2026-11-09 at 15.34.29.jpeg',
];

if (galleryGrid) {
  const galleryLoadMore = document.querySelector('.gallery-load-more');
  const isCompactGallery = window.matchMedia('(max-width: 600px)').matches;
  const initialGalleryCount = isCompactGallery ? 4 : 8;
  const galleryBatchSize = isCompactGallery ? 4 : 8;
  let visibleGalleryCount = initialGalleryCount;

  const galleryItems = galleryPhotoFiles.map((file) => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');

    figure.className = 'gallery-item';
    image.src = file;
    image.alt = 'Bloom Nails manicure and nail-art design';
    image.dataset.full = file;
    image.loading = 'lazy';
    image.decoding = 'async';
    figure.append(image);

    return figure;
  });

  galleryGrid.replaceChildren(...galleryItems);

  const updateGallery = () => {
    galleryItems.forEach((item, index) => {
      item.hidden = index >= visibleGalleryCount;
    });

    if (galleryLoadMore) {
      galleryLoadMore.hidden = visibleGalleryCount >= galleryItems.length;
      galleryLoadMore.textContent = `Show ${Math.min(galleryBatchSize, galleryItems.length - visibleGalleryCount)} more nail designs`;
    }
  };

  galleryLoadMore?.addEventListener('click', () => {
    visibleGalleryCount = Math.min(visibleGalleryCount + galleryBatchSize, galleryItems.length);
    updateGallery();
  });

  updateGallery();
}

const galleryImages = [...document.querySelectorAll('.gallery-item img')];
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-stage img');
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');
const priceTabs = document.querySelectorAll('.price-tab');
const priceCards = document.querySelectorAll('.price-card');
const promoDialog = document.querySelector('.promo-dialog');
const promoDialogClose = document.querySelector('.promo-dialog-close');
let currentGalleryIndex = 0;
let lastFocusedElement = null;

// Show the grand opening offer once per browser tab session.
if (promoDialog instanceof HTMLDialogElement) {
  window.setTimeout(() => {
    if (sessionStorage.getItem('bloom-promo-dismissed') !== 'true') {
      promoDialog.showModal();
    }
  }, 900);

  promoDialog.addEventListener('close', () => {
    sessionStorage.setItem('bloom-promo-dismissed', 'true');
  });

  promoDialogClose.addEventListener('click', () => promoDialog.close());
  promoDialog.querySelector('[data-promo-dismiss]').addEventListener('click', () => promoDialog.close());
  promoDialog.addEventListener('click', (event) => {
    if (event.target === promoDialog) promoDialog.close();
  });
}

// Header scroll state
const setHeaderState = () => {
  if (window.scrollY > 30) {
    header?.classList.add('is-scrolled');
  } else {
    header?.classList.remove('is-scrolled');
  }
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

// Mobile navigation menu toggle
if (menuToggle && mobileMenu) {
  const setMenuOpen = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    mobileMenu.inert = !isOpen;
    document.body.classList.toggle('menu-open', isOpen);
  };

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!expanded);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
}

// Price list interactive category tabs
if (priceTabs.length && priceCards.length) {
  priceTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      const visibleCardCount = Array.from(priceCards).filter(
        (card) => filter === 'all' || card.dataset.category === filter,
      ).length;

      priceTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      document.querySelector('.price-grid').classList.toggle('is-single', visibleCardCount === 1);

      priceCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Reveal animations on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

// Lightbox modal functionality
const openLightbox = (index) => {
  if (!galleryImages.length) return;
  if (!lightbox.classList.contains('is-open')) {
    lastFocusedElement = document.activeElement;
  }
  currentGalleryIndex = index;
  const currentImage = galleryImages[currentGalleryIndex];
  lightboxImg.src = currentImage.dataset.full || currentImage.src;
  lightboxImg.alt = currentImage.alt || 'Expanded gallery photo';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.inert = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => closeButton.focus());
};

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.inert = true;
  document.body.style.overflow = '';
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
};

const showPrev = () => {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentGalleryIndex);
};

const showNext = () => {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  openLightbox(currentGalleryIndex);
};

galleryImages.forEach((image, index) => {
  image.setAttribute('tabindex', '0');
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `Open ${image.alt || 'gallery image'}`);
  image.addEventListener('click', () => openLightbox(index));
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(index);
    }
  });
});

closeButton.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', showPrev);
nextButton.addEventListener('click', showNext);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;

  if (event.key === 'Escape') {
    closeLightbox();
  } else if (event.key === 'ArrowLeft') {
    showPrev();
  } else if (event.key === 'ArrowRight') {
    showNext();
  }
});
