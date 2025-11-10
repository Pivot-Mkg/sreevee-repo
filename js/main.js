// Initialize Swiper
const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,

  // Enable pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
    },
    // when window width is >= 968px
    968: {
      slidesPerView: 3,
    },
    // when window width is >= 1200px
    1200: {
      slidesPerView: 4,
    },
  },

  // Auto play (optional)
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Parallax background movement disabled (keep fixed background only)

// AOS animations (replaces custom reveal)
if (window.AOS) {
  AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' });
}
