// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize preloader
  initPreloader();
  
  // Initialize custom cursor
  initCustomCursor();
  
  // Initialize particles background
  initParticles();
  
  // Initialize back to top button
  initBackToTop();
  
  // Add additional event listeners and animations
  addEventListeners();
});

// Preloader function
function initPreloader() {
  window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
      preloader.classList.add('opacity-0');
      setTimeout(() => {
        preloader.classList.add('d-none');
      }, 500);
    }, 500);
  });
}

// Custom cursor function
function initCustomCursor() {
  const cursorOuter = document.getElementById('cursor-outer');
  const cursorDot = document.getElementById('cursor-dot');
  
  // Show cursors on desktop only
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', function(e) {
      cursorOuter.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      if (cursorDot) {
        cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    });
    
    // Add event listeners for hover effects
    document.querySelectorAll('a, button, .card, .nav-link, .video-container, .carousel-video-container').forEach(item => {
      item.addEventListener('mouseenter', function() {
        cursorOuter.style.width = '30px';
        cursorOuter.style.height = '30px';
        cursorOuter.style.border = '1px solid var(--bs-success)';
        if (cursorDot) {
          cursorDot.style.backgroundColor = 'var(--bs-success)';
        }
      });
      
      item.addEventListener('mouseleave', function() {
        cursorOuter.style.width = '20px';
        cursorOuter.style.height = '20px';
        cursorOuter.style.border = '1px solid rgba(255, 255, 255, 0.5)';
        if (cursorDot) {
          cursorDot.style.backgroundColor = 'white';
        }
      });
    });
  } else {
    // Hide custom cursor on mobile
    cursorOuter.style.display = 'none';
    if (cursorDot) {
      cursorDot.style.display = 'none';
    }
  }
}

// Initialize particles.js
function initParticles() {
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 1000
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "star",
          stroke: {
            width: 1,
            color: "#000000"
          },
        },
        opacity: {
          value: 0.1,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#198754",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.8
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

// Back to top button
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('opacity-100');
      backToTopButton.classList.remove('opacity-0');
    } else {
      backToTopButton.classList.add('opacity-0');
      backToTopButton.classList.remove('opacity-100');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Additional event listeners and animations
function addEventListeners() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Enable tooltips and popovers
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
  
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  });
  
  // Add animation to elements when they come into view
  const elementsToAnimate = document.querySelectorAll('.card, .btn:not(#back-to-top), h1:not(.animate__animated), h2:not(.animate__animated), h3:not(.animate__animated), .lead:not(.animate__animated)');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        setTimeout(() => {
          entry.target.classList.remove('animate__fadeInUp');
        }, 1000);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
}