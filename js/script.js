document.addEventListener("DOMContentLoaded", () => {
  // Trigger Hero Animation on load
  const heroContent = document.querySelector('.animate-on-load');
  if (heroContent) {
    // Slight delay for a smoother effect
    setTimeout(() => {
      heroContent.classList.add('visible');
    }, 150);
  }

  // Optional: Simple Mobile Menu Toggle Logic
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if(menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      // In a full build, you'd toggle a specific class to slide down the menu
      alert("Mobile menu clicked! We can build the expanded mobile menu styles if needed.");
    });
  }
});