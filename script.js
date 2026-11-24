document.addEventListener('DOMContentLoaded', () => {
  // 1. Toggle Menu Navigasi Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Tutup menu mobile otomatis saat link diklik
    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Highlight Menu Navigasi Aktif Saat Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // 3. Filter Terpisah untuk Layanan (#serviceGrid) & Galeri (#galleryGrid)
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetGridId = button.getAttribute('data-target');
      const targetGrid = document.getElementById(targetGridId);
      if (!targetGrid) return;

      // Reset tombol active hanya dalam grup filter yang sama
      const siblingButtons = button.parentElement.querySelectorAll('.filter-btn');
      siblingButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedFilter = button.getAttribute('data-filter');
      const items = targetGrid.querySelectorAll('.filter-item');

      items.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (selectedFilter === 'all' || itemCategory === selectedFilter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // 4. Modal Detail Paket
  const packageModal = document.getElementById('packageModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDetails = document.getElementById('modalDetails');
  const modalWaLink = document.getElementById('modalWaLink');
  const modalFormLink = document.getElementById('modalFormLink');
  const modalClose = document.getElementById('modalClose');
  const detailButtons = document.querySelectorAll('.detail-btn');

  if (packageModal && detailButtons.length > 0) {
    detailButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title');
        const price = btn.getAttribute('data-price');
        const details = btn.getAttribute('data-details');

        modalTitle.textContent = title;
        modalPrice.textContent = price;
        modalDetails.textContent = details;

        const waMessage = encodeURIComponent(`Halo FrameCraft, saya ingin konsultasi dan booking untuk ${title}.`);
        modalWaLink.href = `https://wa.me/6281234567890?text=${waMessage}`;

        packageModal.classList.add('show');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => packageModal.classList.remove('show'));
    }
    if (modalFormLink) {
      modalFormLink.addEventListener('click', () => packageModal.classList.remove('show'));
    }
  }

  // 5. Modal Lightbox Preview Foto
  const photoModal = document.getElementById('photoModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const photoModalClose = document.getElementById('photoModalClose');
  const galleryPhotos = document.querySelectorAll('.gallery-photo');

  if (photoModal && galleryPhotos.length > 0) {
    galleryPhotos.forEach((card) => {
      card.addEventListener('click', () => {
        const imgSrc = card.querySelector('img').src;
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');

        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        photoModal.classList.add('show');
      });
    });

    if (photoModalClose) {
      photoModalClose.addEventListener('click', () => photoModal.classList.remove('show'));
    }
  }

  // Tutup modal jika area gelap di luar kotak diklik
  window.addEventListener('click', (e) => {
    if (packageModal && e.target === packageModal) {
      packageModal.classList.remove('show');
    }
    if (photoModal && e.target === photoModal) {
      photoModal.classList.remove('show');
    }
  });

  // 6. Form Kontak -> Redirect Otomatis ke WhatsApp
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const wa = document.getElementById('clientWhatsapp').value.trim();
      const service = document.getElementById('serviceType').value;
      const date = document.getElementById('eventDate').value;
      const message = document.getElementById('clientMessage').value.trim();

      const text = `Halo FrameCraft, saya ingin konsultasi/booking:\n` +
                   `• Nama: ${name}\n` +
                   `• No. WA: ${wa}\n` +
                   `• Layanan: ${service}\n` +
                   `• Tanggal Acara: ${date}\n` +
                   `• Catatan: ${message}`;

      const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });
  }
});