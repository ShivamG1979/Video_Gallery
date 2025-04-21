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
                    <button class="btn border-0 bg-transparent text-white fs-1"
                            style="filter: drop-shadow(0 0 5px rgba(0,0,0,0.6)); 
                                   transition: transform 0.3s ease;"
                            onclick="playVideo('${video.url}', '${video.title.replace(/'/g, "\\'")}')">
                      <i class="fas fa-play-circle"></i>
                    </button>
                    <h5 class="text-center mt-2">${video.title}</h5>
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
  // Remove aria-hidden attribute from modal container
  // videoModal.setAttribute("aria-hidden", "true"); - removed
  
  videoModal.innerHTML = `
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content bg-dark border-0 rounded-3">
        <div class="modal-header border-0 pb-0">
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="ratio ratio-16x9">
            <iframe id="videoFrame" src="" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(videoModal);

  // Get references to modal elements
  const modalElement = document.getElementById("videoModal");
  const closeButton = modalElement.querySelector(".btn-close");

  // Handle modal events with accessibility fixes
  modalElement.addEventListener('hidden.bs.modal', function() {
    document.getElementById("videoFrame").src = '';
    
    // Move focus to a safe element after modal closes
    // This prevents focus from staying on the close button while the modal has aria-hidden
    setTimeout(() => {
      document.querySelector("body").focus();
    }, 50);
  });
  
  // Ensure modal close button doesn't maintain focus when clicked
  closeButton.addEventListener('click', function() {
    // Remove focus from the close button before Bootstrap processes the modal closing
    this.blur();
  });
  
  // Fix for Bootstrap's modal implementation
  const bootstrapModal = new bootstrap.Modal(modalElement);
  const originalHide = bootstrapModal.hide;
  
  // Monkey patch the hide method to ensure blur happens first
  bootstrapModal.hide = function() {
    closeButton.blur();
    setTimeout(() => {
      originalHide.call(bootstrapModal);
    }, 10);
  };
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

// Play video in modal
function playVideo(url, title) {
  const videoModal = new bootstrap.Modal(document.getElementById("videoModal"));
  const videoFrame = document.getElementById("videoFrame");
  
  // Clear any previous source first
  videoFrame.src = '';
  
  // Check if it's a playlist URL
  if (url.includes('list=')) {
    // Extract playlist ID
    const playlistMatch = url.match(/list=([^&]+)/);
    if (playlistMatch && playlistMatch[1]) {
      const playlistId = playlistMatch[1];
      videoFrame.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`;
      videoModal.show();
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
  
  videoModal.show();
}

function setupCardInteractions() {
  document.querySelectorAll(".video-item").forEach((card) => {
    const overlay = card.querySelector(".overlay-element");
    
    // Hover effects
    card.addEventListener("mouseenter", () => {
      overlay.style.opacity = "1";
      card.style.transform = "translateY(-3px)";
    });

    card.addEventListener("mouseleave", () => {
      overlay.style.opacity = "0";
      card.style.transform = "translateY(0)";
    });
    
    // Click to play video
    card.addEventListener("click", (e) => {
      if (!e.target.closest('.btn')) {
        const url = card.dataset.videoUrl;
        const title = card.dataset.videoTitle;
        playVideo(url, title);
      }
    });
  });
  
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
  
  // Apply Poppins font to all elements
  document.body.style.fontFamily = "'Poppins', sans-serif";

  // Add container for tabs for better mobile layout
  const tabWrapper = document.createElement("div");
  tabWrapper.className = "container-fluid px-0";
  videoTabs.parentNode.insertBefore(tabWrapper, videoTabs);
  tabWrapper.appendChild(videoTabs);
  
  // Add resize handler to adjust layout if needed
  window.addEventListener("resize", function() {
    const isMobile = window.innerWidth < 768;
    
    // Additional mobile-specific adjustments can be added here if needed
    document.querySelectorAll('#videoTabs .nav-link').forEach(button => {
      // Equal width buttons on mobile, variable on desktop
      button.style.width = isMobile ? "100%" : "auto";
    });
  });
  
  // Trigger resize once to apply initial settings
  window.dispatchEvent(new Event('resize'));
  
  // Add tabindex to body to make it focusable for accessibility
  document.body.setAttribute("tabindex", "-1");
  document.body.style.outline = "none"; // Hide focus outline on body
});