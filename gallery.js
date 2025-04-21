// DOM elements
const videoTabs = document.getElementById("videoTabs");
const videoTabContent = document.getElementById("videoTabContent");

// Create and append video tabs and content
function createVideoGallery() {
  // Add wrapper class (no longer mobile-specific)
  videoTabs.classList.add("tabs-wrapper");

  const galleryTitle = document.createElement("div");
  galleryTitle.className = "container-fluid mb-2";
  videoTabs.parentNode.insertBefore(galleryTitle, videoTabs);

  videoCategories.forEach((category, categoryIndex) => {
    // Create tab nav item
    const tabItem = document.createElement("li");
    tabItem.className = "nav-item";
    tabItem.innerHTML = `
      <button class="nav-link ${categoryIndex === 0 ? "active" : ""} mx-1 mb-2 border-0 rounded-pill" 
              id="tab-${categoryIndex}" 
              data-bs-toggle="pill" 
              data-bs-target="#content-${categoryIndex}" 
              type="button">
              <span>${category.name}</span>
      </button>
    `;
    videoTabs.appendChild(tabItem);

    // Create content pane
    const contentDiv = document.createElement("div");
    contentDiv.className = `tab-pane fade ${categoryIndex === 0 ? "show active" : ""}`;
    contentDiv.id = `content-${categoryIndex}`;

    contentDiv.innerHTML = `
      <div class="mt-2">
        <h1 class="category-title mb-3 ps-2">
          <span class="text-light">${category.name}</span>
        </h1>
        <div class="row g-2 g-md-3 g-lg-4 mt-3">
          ${category.videos
            .map(
              (video, i) => `
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="${50 * (i % 6)}">
              <div class="card h-100 border-0 bg-dark text-light video-card mx-auto mx-sm-2 no-shadow" 
                   data-video-url="${video.url}" 
                   data-video-title="${video.title}">
                <div class="position-relative rounded overflow-hidden">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E" 
                       data-src="${video.thumbnail}" 
                       class="card-img-top rounded lazy-image" 
                       alt="${video.title}">
                 
                  <div class="card-overlay">
                    <a href="${video.url}" target="_blank" class="play-button">
                      <i class="fas fa-play-circle"></i>
                    </a>
                    <h5 class="hover-title">${video.title}</h5>
                  </div>
                </div>
                
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    videoTabContent.appendChild(contentDiv);
  });

  setupThumbnailPreview();
  addUpdatedStyles();
  initLazyLoading();
}

function addUpdatedStyles() {
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    /* Add Poppins font to all elements */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    body, button, input, h1, h2, h3, h4, h5, h6, p, span, a, div {
      font-family: 'Poppins', sans-serif;
    }
    
    /* Base styles */
    body {
      background-color: black;
      color: white;
      overflow-x: hidden;
      font-family: 'Poppins', sans-serif; 
    }
    
     /* Fixed header styles */
    header.sticky-top {
      position: sticky;
      top: 0;
      z-index: 1030; /* Higher z-index to keep header above content */
      background-color: black;
    }
    
    /* Add padding to content to prevent overlap with header */
    #gallery-section {
      padding-top: 6rem; /* Adjust this value based on your header height */
    }
    
    /* Adjust category title position */
    .category-title {
      margin-top: 1rem;
    }
    
    /* Make sure tabs don't get hidden under header */
    #videoTabs {
      position: relative;
      z-index: 10;
    }
    /* Tab navigation */
    .tabs-wrapper {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 5px 0;
      margin: 0 -5px;
      justify-content: flex-start;
      align-items: center;
      font-family: 'Poppins', sans-serif;
    }
    
    .tabs-wrapper::-webkit-scrollbar {
      display: none;
    }
    
    .nav-item {
      margin: 0 3px;
      flex: 0 0 auto;
    }
    
    .nav-link {
      background-color: transparent;
      color: black;
      padding: 8px 15px !important;
      font-size: 1rem;
      border-radius: 50px !important;
      transition: all 0.2s ease;
      min-width: 40px;
      text-align: center;
      border: 1px solid white !important;
      color: white;
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
    }
    
    .nav-link:hover {
      color: white !important;
      background-color: rgba(24, 21, 21, 0.1) !important;
    }
    
    .nav-link.active {
      background: white !important; 
      color: black !important; 
      font-weight: 500;
    }
    
    /* Video cards */
    .video-card {
      transition: transform 0.3s ease;
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      max-width: 100%;
    }
    
    .video-card:hover, .video-card:active {
      transform: translateY(-3px);
    }
    
    /* Card images */
    .card-img-top {
      aspect-ratio: 16/9;
      object-fit: cover;
      height: auto;
    }
    
    /* Lazy loading placeholder style */
    .lazy-image {
      transition: opacity 0.3s ease;
      opacity: 0;
    }
    
    .lazy-image.loaded {
      opacity: 1;
    }
    
    /* Title overlay */
    .title-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0) 100%);
      padding: 30px 10px 10px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    
    .thumbnail-title {
      color: white;
      margin: 0;
      font-size: 0.9rem;
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-weight: 400;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    }
    
    /* Overlay with gradient */
    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: opacity 0.3s ease;
      color: white;
      opacity: 0;
      padding: 0.5rem;
      border-radius: 6px;
      font-family: 'Poppins', sans-serif;
    }
    
    .video-card:hover .card-overlay {
      opacity: 1;
    }
    
    /* Play button */
    .play-button {
      color: #fff;
      opacity: 0.9;
      transition: transform 0.3s ease;
      cursor: pointer;
      z-index: 100;
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.6));
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }
    
    .play-button:hover {
      transform: scale(1.2);
      color: inherit !important;
      text-decoration: none !important;
    }
    
    /* Video titles */
    .hover-title {
      text-align: center;
      margin-top: 0.5rem;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
    }
    
    .video-card:hover .hover-title {
      opacity: 1;
      transform: translateY(0);
    }
    
    .card-title {
      font-size: 0.9rem;
      line-height: 1.2;
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
    }
    
    /* Category title */
    .category-title {
      font-size: 2rem;
      position: relative;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
    }
    
    /* Video card active state */
    .video-card.active .card-overlay {
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(styleElement);
}

function setupThumbnailPreview() {
  const containers = document.querySelectorAll(".video-card");

  // Standard desktop hover behavior
  containers.forEach((container) => {
    container.addEventListener("mouseenter", () => {
      container.querySelector(".card-overlay").style.opacity = "1";
    });

    container.addEventListener("mouseleave", () => {
      container.querySelector(".card-overlay").style.opacity = "0";
    });
  });
}

function initLazyLoading() {
  // Create intersection observer
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => {
          img.classList.add('loaded');
        };
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: "200px 0px", // Start loading images when they're 200px from entering viewport
    threshold: 0.01
  });

  // Apply observer to all lazy images
  document.querySelectorAll('.lazy-image').forEach(img => {
    lazyImageObserver.observe(img);
  });
}

function setupTabEventListeners() {
  const tabTriggers = document.querySelectorAll('[data-bs-toggle="pill"]');

  tabTriggers.forEach((tabTrigger) => {
    tabTrigger.addEventListener("click", function() {
      // Remove active class from all tabs
      tabTriggers.forEach((tab) => {
        tab.classList.remove("active");
      });

      // Add active class to clicked tab
      this.classList.add("active");

      // Scroll active tab into view
      setTimeout(() => {
        this.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }, 100);
      
      // Trigger lazy loading check when changing tabs
      setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
      }, 200);
    });
  });
}

// Init on DOM load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  AOS.init({
    duration: 600,
    easing: "ease-out",
    once: true,
    offset: 50
  });

  createVideoGallery();
  setupTabEventListeners();

  // Ensure first tab is scrolled into view
  setTimeout(() => {
    const firstTab = document.querySelector(".nav-link.active");
    if (firstTab) {
      firstTab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, 300);

  // Handle custom cursor if it exists
  const cursorOuter = document.getElementById("cursor-outer");
  if (cursorOuter) {
    initCustomCursor();
  }
});

// Custom cursor function simplified for performance
function initCustomCursor() {
  const cursorOuter = document.getElementById("cursor-outer");
  const cursorDot = document.getElementById("cursor-dot");

  if (!cursorOuter) return;

  document.addEventListener("mousemove", function(e) {
    requestAnimationFrame(() => {
      cursorOuter.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      if (cursorDot) {
        cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    });
  });

  document.querySelectorAll("a, button, .video-card").forEach((item) => {
    item.addEventListener("mouseenter", function() {
      cursorOuter.classList.add("cursor-hover");
      if (cursorDot) cursorDot.classList.add("dot-hover");
    });

    item.addEventListener("mouseleave", function() {
      cursorOuter.classList.remove("cursor-hover");
      if (cursorDot) cursorDot.classList.remove("dot-hover");
    });
  });
}