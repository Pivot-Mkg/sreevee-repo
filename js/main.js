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
  AOS.init({ duration: 600, once: true, easing: "ease-out-cubic" });
}
