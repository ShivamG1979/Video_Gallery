// DOM elements
const videoTabs = document.getElementById("videoTabs");
const videoTabContent = document.getElementById("videoTabContent");

// Create and append video tabs and content
function createVideoGallery() {
  // Make tabs responsive - horizontal on desktop, column on mobile
  videoTabs.classList.add("nav", "nav-pills");
  
  // Use flexbox properties that change with breakpoints
  videoTabs.classList.add("flex-column", "flex-md-row"); // Column on mobile, row on desktop
  videoTabs.classList.add("gap-2", "mb-3");
  
  // Only enable horizontal scrolling on desktop
  videoTabs.classList.add("overflow-md-auto");
  videoTabs.style.cssText = "scrollbar-width: none; -ms-overflow-style: none;";
  
  // Create video modal for popup playback
  createVideoModal();

  videoCategories.forEach((category, categoryIndex) => {
    // Create tab nav item
    const tabItem = document.createElement("li");
    tabItem.className = "nav-item"; // Remove flex-shrink-0 to allow full width on mobile
    tabItem.innerHTML = `
      <button class="nav-link ${categoryIndex === 0 ? "active" : ""} mb-2 rounded-pill w-100" 
              id="tab-${categoryIndex}" 
              data-bs-toggle="pill" 
              data-bs-target="#content-${categoryIndex}" 
              type="button"
              style="background-color: ${categoryIndex === 0 ? 'white' : 'transparent'}; 
                     color: ${categoryIndex === 0 ? 'black' : 'white'}; 
                     border: 1px solid white;">
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
        <h1 class="mb-3 ps-2 fs-2 text-light fw-bold">${category.name}</h1>
        <div class="row g-2 g-md-3 g-lg-4 mt-3">
          ${category.videos
            .map(
              (video, i) => `
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="${50 * (i % 6)}">
              <div class="card h-100 border-0 bg-dark text-light rounded-3 mx-auto mx-sm-2 video-item" 
                   data-video-url="${video.url}" 
                   data-video-title="${video.title}"
                   style="cursor: pointer; transition: transform 0.3s ease;">
                <div class="position-relative rounded overflow-hidden">
                  <img src="${video.thumbnail}" 
                       class="card-img-top" 
                       alt="${video.title}"
                       style="aspect-ratio: 16/9; object-fit: cover;">
                 
                  <div class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center overlay-element"
                       style="background: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%); 
                              opacity: 0; 
                              transition: opacity 0.3s ease;">
                    <button class="btn border-0 bg-transparent text-white fs-1 play-button"
                            style="filter: drop-shadow(0 0 5px rgba(0,0,0,0.6)); 
                                   transition: transform 0.3s ease;"
                            onclick="playVideo('${video.url}', '${video.title.replace(/'/g, "\\'")}')">
                      <i class="fas fa-play-circle"></i>
                    </button>
                    <h5 class="video-title text-center mt-2">${video.title}</h5>
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

  setupCardInteractions();
}

function createVideoModal() {
  // Create modal container
  const videoModal = document.createElement("div");
  videoModal.className = "modal fade";
  videoModal.id = "videoModal";
  videoModal.tabIndex = "-1";
  videoModal.setAttribute("aria-labelledby", "videoModalLabel");
  videoModal.setAttribute("aria-hidden", "true");
  
  videoModal.innerHTML = `
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content bg-dark border-0 rounded-3">
        <div class="modal-header border-0 p-2">
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="ratio ratio-16x9">
            <iframe id="videoFrame" src="" title="Video player" allowfullscreen tabindex="0"></iframe>
          </div>
        </div> 
      </div>
    </div>
  `;
  document.body.appendChild(videoModal);

  // Improved modal event handling
  const modalElement = document.getElementById("videoModal");
  
  // Enhanced modal closing and cleanup
  modalElement.addEventListener('hidden.bs.modal', function() {
    // Clear the iframe src immediately when modal is hidden
    const videoFrame = document.getElementById("videoFrame");
    if (videoFrame) {
      videoFrame.src = '';
    }
    
    // Force cleanup of modal resources
    document.body.classList.remove('modal-open');
    
    // Remove any lingering backdrops
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.remove();
    });
    
    // Fix overflow issues
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    // Return focus to the element that opened the modal
    if (window.lastFocusedElement && document.body.contains(window.lastFocusedElement)) {
      window.lastFocusedElement.focus();
      window.lastFocusedElement = null;
    }
  });
}

// Enhanced YouTube video ID extraction
function getYoutubeVideoId(url) {
  if (!url) return null;
  
  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  // Return the video ID if found
  return (match && match[2].length === 11) ? match[2] : null;
}

// Play video in modal with improved handling to prevent hanging
function playVideo(url, title) {
  try {
    // Remember last focused element for accessibility
    window.lastFocusedElement = document.activeElement;
    
    // Get modal element directly
    const modalElement = document.getElementById("videoModal");
    if (!modalElement) {
      console.error("Video modal element not found");
      return;
    }
    
    const videoFrame = document.getElementById("videoFrame");
    if (!videoFrame) {
      console.error("Video frame element not found");
      return;
    }
    
    // Set modal title if available
    const modalTitle = document.getElementById("videoModalLabel");
    if (modalTitle && title) {
      modalTitle.textContent = title;
    }
    
    // Make sure any previous modal is properly closed
    const existingBackdrop = document.querySelector('.modal-backdrop');
    if (existingBackdrop) {
      existingBackdrop.remove();
      document.body.classList.remove('modal-open');
    }
    
    // Clear any previous source first
    videoFrame.src = '';
    
    // Add event listener for when modal is shown to set source
    const onModalShown = function() {
      try {
        // Check if it's a playlist URL
        if (url.includes('list=')) {
          // Extract playlist ID
          const playlistMatch = url.match(/list=([^&]+)/);
          if (playlistMatch && playlistMatch[1]) {
            const playlistId = playlistMatch[1];
            videoFrame.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`;
            return;
          }
        }
        
        // Otherwise, handle as a regular video
        const videoId = getYoutubeVideoId(url);
        
        if (videoId) {
          videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
          console.error('Could not extract YouTube video ID from:', url);
          videoFrame.src = 'about:blank'; // Prevent loading invalid URL
        } else {
          videoFrame.src = url;
        }
        
        // Focus on the iframe for better keyboard navigation
        setTimeout(() => {
          videoFrame.focus();
        }, 100);
      } catch (e) {
        console.error("Error loading video:", e);
      }
      
      // Remove this one-time listener after execution
      modalElement.removeEventListener('shown.bs.modal', onModalShown);
    };
    
    // Add the one-time listener
    modalElement.addEventListener('shown.bs.modal', onModalShown);
    
    // Initialize and show the modal
    let videoModal;
    try {
      videoModal = new bootstrap.Modal(modalElement);
      videoModal.show();
    } catch (e) {
      console.error("Error showing modal:", e);
      // Fallback if modal instance creation fails
      jQuery(modalElement).modal('show');
    }
  } catch (e) {
    console.error("Error in playVideo function:", e);
  }
}

function setupCardInteractions() {
  const isMobile = () => window.innerWidth < 768;
  let touchedCard = null; // Track which card was touched last
  let isScrolling = false; // Track if user is currently scrolling
  let scrollTimeout;
  let touchStartY = 0;
  let touchMoveY = 0;
  const scrollThreshold = 10; // Pixels threshold to consider a scroll vs tap
  
  // Detect scrolling
  document.addEventListener('scroll', function() {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      isScrolling = false;
    }, 100);
  }, { passive: true });
  
  document.querySelectorAll(".video-item").forEach((card) => {
    const overlay = card.querySelector(".overlay-element");
    const playButton = card.querySelector(".play-button");
    
    // Desktop: Handle hover effects
    card.addEventListener("mouseenter", () => {
      if (!isMobile()) {
        overlay.style.opacity = "1";
        card.style.transform = "translateY(-3px)";
      }
    });

    card.addEventListener("mouseleave", () => {
      if (!isMobile()) {
        overlay.style.opacity = "0";
        card.style.transform = "translateY(0)";
      }
    });
    
    // Mobile: Improved touch handling
    card.addEventListener("touchstart", (e) => {
      // Record starting touch position for scroll detection
      touchStartY = e.touches[0].clientY;
      
      // Skip processing if already scrolling
      if (isScrolling) return;
      
      // Don't prevent default here to allow natural scrolling
    }, { passive: true });
    
    // Track touch movement to detect scrolling intention
    card.addEventListener("touchmove", (e) => {
      touchMoveY = e.touches[0].clientY;
      // If moved significantly vertically, mark as scrolling
      if (Math.abs(touchMoveY - touchStartY) > scrollThreshold) {
        isScrolling = true;
      }
    }, { passive: true });
    
    // Handle touch end for better mobile experience
    card.addEventListener("touchend", (e) => {
      // If was scrolling, reset but don't process tap
      if (isScrolling) {
        setTimeout(() => { isScrolling = false; }, 100);
        return;
      }
      
      // If tap was on the play button, let the click handler deal with it
      if (e.target.closest('.play-button')) {
        return;
      }
      
      // If this was a genuine tap (not a scroll), toggle the overlay
      
      // If a different card was previously touched, hide its overlay
      if (touchedCard && touchedCard !== card) {
        const prevOverlay = touchedCard.querySelector(".overlay-element");
        prevOverlay.style.opacity = "0";
        touchedCard.classList.remove("card-active");
      }
      
      // Toggle the current card's overlay
      if (card.classList.contains("card-active")) {
        // Second tap on the same card - do nothing, wait for play button tap
      } else {
        // First tap - show overlay with play button and title
        overlay.style.opacity = "1";
        card.classList.add("card-active");
        touchedCard = card;
      }
    }, { passive: true });
    
    // Dedicated handler for play button
    playButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the card click from firing
      const url = card.dataset.videoUrl;
      const title = card.dataset.videoTitle;
      playVideo(url, title);
    });
    
    // For desktop: Allow clicking anywhere on card to play
    card.addEventListener("click", (e) => {
      if (!isMobile() && !e.target.closest('.play-button')) {
        const url = card.dataset.videoUrl;
        const title = card.dataset.videoTitle;
        playVideo(url, title);
      }
    });
  });
  
  // Hide active card overlay when clicking elsewhere on the page
  document.addEventListener("touchstart", (e) => {
    if (touchedCard && !e.target.closest('.video-item') && !isScrolling) {
      const activeOverlay = touchedCard.querySelector(".overlay-element");
      activeOverlay.style.opacity = "0";
      touchedCard.classList.remove("card-active");
      touchedCard = null;
    }
  }, { passive: true });
  
  // Add active tab listener
  const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');
  tabButtons.forEach((tab) => {
    tab.addEventListener('shown.bs.tab', function() {
      // Update tab styles
      tabButtons.forEach(btn => {
        if (btn.classList.contains('active')) {
          btn.style.backgroundColor = 'white';
          btn.style.color = 'black';
        } else {
          btn.style.backgroundColor = 'transparent';
          btn.style.color = 'white';
        }
      });
      
      // Reset any active card when changing tabs
      if (touchedCard) {
        const activeOverlay = touchedCard.querySelector(".overlay-element");
        activeOverlay.style.opacity = "0";
        touchedCard.classList.remove("card-active");
        touchedCard = null;
      }
      
      // Scroll active tab into view on desktop only
      if (window.innerWidth >= 768) {
        setTimeout(() => {
          tab.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
          });
        }, 100);
      }
    });
  });
}

// Init on DOM load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations if AOS exists
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,
      offset: 50
    });
  }

  createVideoGallery();
  
  // Make playVideo global
  window.playVideo = playVideo;
  
  // Set dark background if not already set
  document.body.style.backgroundColor = document.body.style.backgroundColor || "black";
  document.body.style.color = document.body.style.color || "white";
  
  // Font style - Using Poppins font
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);
  
  // Apply Poppins font to text elements only, excluding Font Awesome icons
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    body, h1, h2, h3, h4, h5, h6, p, span, div, button, input, select, textarea, label, a {
      font-family: 'Poppins', sans-serif !important;
    }
    
    /* Preserve Font Awesome icons */
    .fas, .fab, .far, .fa {
      font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands', 'FontAwesome' !important;
    }
    
    /* Modal fixes to prevent hanging */
    .modal-backdrop {
      z-index: 1040 !important;
    }
    
    .modal {
      z-index: 1050 !important;
    }
    
    /* Mobile-specific styles */
    @media (max-width: 767px) {
      .video-item {
        position: relative;
      }
      
      /* Hide overlay by default */
      .video-item .overlay-element {
        opacity: 0 !important;
        background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%) !important;
        transition: opacity 0.2s ease !important;
      }
      
      /* Show overlay when card is active */
      .video-item.card-active .overlay-element {
        opacity: 1 !important;
      }
      
      /* Make play button more prominent */
      .video-item .play-button {
        font-size: 3rem !important;
        filter: drop-shadow(0 0 10px rgba(0,0,0,0.9)) !important;
      }
      
      /* Ensure titles are readable */
      .video-item .video-title {
        font-size: 1.1rem !important;
        font-weight: 600 !important;
        text-align: center !important;
        max-width: 90% !important;
        filter: drop-shadow(0 0 3px rgba(0,0,0,1)) !important;
      }
      
      /* Add visual feedback for active cards */
      .video-item.card-active {
        border: 2px solid rgba(255, 255, 255, 0.5) !important;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.2) !important;
      }
      
      /* Make play button appear clickable with subtle animation */
      .video-item.card-active .play-button {
        animation: pulse 1.5s infinite ease-in-out;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    }
  `;
  document.head.appendChild(styleElement);

  // Add container for tabs for better mobile layout
  const tabWrapper = document.createElement("div");
  tabWrapper.className = "container-fluid px-0";
  videoTabs.parentNode.insertBefore(tabWrapper, videoTabs);
  tabWrapper.appendChild(videoTabs);
  
  // Add resize handler to adjust layout and behavior for mobile/desktop
  window.addEventListener("resize", function() {
    const isMobile = window.innerWidth < 768;
    
    // Additional mobile-specific adjustments
    document.querySelectorAll('#videoTabs .nav-link').forEach(button => {
      // Equal width buttons on mobile, variable on desktop
      button.style.width = isMobile ? "100%" : "auto";
    });
    
    // Reset any active cards when resizing
    document.querySelectorAll(".video-item.card-active").forEach(card => {
      const overlay = card.querySelector(".overlay-element");
      overlay.style.opacity = "0";
      card.classList.remove("card-active");
    });
  });
  
  // Trigger resize once to apply initial settings
  window.dispatchEvent(new Event('resize'));
});