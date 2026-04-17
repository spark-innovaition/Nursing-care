document.addEventListener("DOMContentLoaded", () => {
  // 1. Trigger Hero Animation on load
  const heroContent = document.querySelector('.animate-on-load');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('visible');
    }, 150);
  }

  // 2. Mobile Menu Toggle Logic
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if(menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      alert("Mobile menu clicked! We can build the expanded mobile menu styles if needed.");
    });
  }

  // 3. Why Choose Us Accordion Logic
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const icon = header.querySelector('.accordion-icon');

      // Optional: Close other open accordions when one is clicked
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = null;
          otherItem.querySelector('.accordion-icon').textContent = '+';
        }
      });

      // Toggle current accordion
      item.classList.toggle('active');

      if (item.classList.contains('active')) {
        // Expand
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.textContent = '−'; // Using a minus sign character for better visual alignment
      } else {
        // Collapse
        content.style.maxHeight = null;
        icon.textContent = '+';
      }
    });
  });

  // 4. How We Work Steps — click title to reveal its description
  const workSteps = document.querySelectorAll('.work-step');
  workSteps.forEach(step => {
    const heading = step.querySelector('h3');
    if (!heading) return;
    heading.addEventListener('click', () => {
      if (step.classList.contains('active')) return;
      workSteps.forEach(other => other.classList.remove('active'));
      step.classList.add('active');
    });
  });

  // 5. Testimonial auto-rotate
  const testimonialContainer = document.querySelector('.testimonial-container');
  if (testimonialContainer) {
    const quoteEl = testimonialContainer.querySelector('.quote');
    const authorEl = testimonialContainer.querySelector('.author');
    const avatars = testimonialContainer.querySelectorAll('.avatar');
    const ROTATION_MS = 5000;
    const FADE_MS = 300;

    let currentIndex = Array.from(avatars).findIndex(a => a.classList.contains('active'));
    if (currentIndex === -1) currentIndex = 0;
    let intervalId = null;

    function showTestimonial(index) {
      const avatar = avatars[index];
      if (!avatar || index === currentIndex) return;

      quoteEl.style.opacity = '0';
      authorEl.style.opacity = '0';

      setTimeout(() => {
        quoteEl.textContent = avatar.dataset.quote;
        authorEl.textContent = avatar.dataset.author;
        avatars.forEach(a => a.classList.remove('active'));
        avatar.classList.add('active');
        quoteEl.style.opacity = '1';
        authorEl.style.opacity = '1';
      }, FADE_MS);

      currentIndex = index;
    }

    function nextTestimonial() {
      showTestimonial((currentIndex + 1) % avatars.length);
    }

    function startRotation() {
      stopRotation();
      intervalId = setInterval(nextTestimonial, ROTATION_MS);
    }

    function stopRotation() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    avatars.forEach((avatar, i) => {
      avatar.addEventListener('click', () => {
        showTestimonial(i);
        startRotation();
      });
    });

    testimonialContainer.addEventListener('mouseenter', stopRotation);
    testimonialContainer.addEventListener('mouseleave', startRotation);

    startRotation();
  }

  // 6. Reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(el => observer.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('revealed'));
    }
  }
});