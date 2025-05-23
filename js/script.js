// Inisialisasi AOS (Animasi Scroll)
AOS.init({
  duration: 1000, // Durasi animasi
  once: true // Animasi hanya sekali
});

// Efek Scroll Smooth untuk Navbar
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
