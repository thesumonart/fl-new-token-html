document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".berger-button");
  const sidebarMenu = document.getElementById("sidebarMenu");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("sidebarOverlay");

  // Function to open menu
  function openMenu() {
    sidebarMenu.classList.add("active");
    overlay.classList.add("active");
  }

  // Function to close menu
  function closeSidebar() {
    sidebarMenu.classList.remove("active");
    overlay.classList.remove("active");
  }

  // Event Listeners
  menuButton.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
});

// NavBar

// watchlist switch button toggle

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".switch-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove 'active' class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));

      // Add 'active' class to the clicked button
      button.classList.add("active");
    });
  });
});

// Watchlist items

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".watchlist-items-wrapper");
  const content = wrapper.innerHTML;

  // Create multiple copies to ensure no gaps and make it look like a slider
  wrapper.innerHTML = `<div class="marquee-track">${content}${content}${content}</div>`;

  const marqueeTrack = document.querySelector(".marquee-track");
  const contentWidth = marqueeTrack.scrollWidth / 3; // Width of one set of content

  let currentIndex = 0; // Track the current index of the visible slide
  let animationPaused = false;
  let lastScrollPosition = 0;

  function scrollToSlide(index) {
    marqueeTrack.scrollLeft = index * contentWidth;
  }

  function scrollMarquee() {
    if (animationPaused) return;

    currentIndex++;
    if (currentIndex >= 3) {
      // 3 because there are 3 copies of the content
      currentIndex = 0;
    }

    scrollToSlide(currentIndex);
  }

  // Run the marquee scroll every 3 seconds (auto-scroll functionality)
  const scrollInterval = setInterval(scrollMarquee, 3000);

  // Horizontal drag-to-scroll functionality
  let isDragging = false;
  let startX, scrollLeft;

  // When mouse is pressed down
  marqueeTrack.addEventListener("mousedown", (e) => {
    isDragging = true;
    animationPaused = true;
    clearInterval(scrollInterval); // Stop auto-scroll when user starts dragging

    startX = e.pageX - marqueeTrack.offsetLeft;
    scrollLeft = marqueeTrack.scrollLeft;
    marqueeTrack.style.cursor = "grabbing"; // Change cursor on drag
  });

  // When mouse is moved
  marqueeTrack.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const x = e.pageX - marqueeTrack.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    marqueeTrack.scrollLeft = scrollLeft - walk;
  });

  // When mouse button is released
  marqueeTrack.addEventListener("mouseup", () => {
    isDragging = false;
    marqueeTrack.style.cursor = "grab"; // Reset cursor when not dragging

    // Determine the closest slide to snap to
    const slideIndex = Math.round(marqueeTrack.scrollLeft / contentWidth);
    currentIndex = slideIndex;
    scrollToSlide(currentIndex);

    // Resume auto-scrolling from the current position
    animationPaused = false;
    setInterval(scrollMarquee, 3000); // Restart auto-scroll
  });

  // When mouse leaves the area
  marqueeTrack.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      marqueeTrack.style.cursor = "grab";

      // Determine the closest slide to snap to
      const slideIndex = Math.round(marqueeTrack.scrollLeft / contentWidth);
      currentIndex = slideIndex;
      scrollToSlide(currentIndex);

      // Resume auto-scrolling from the current position
      animationPaused = false;
      setInterval(scrollMarquee, 3000); // Restart auto-scroll
    }
  });
});

// Timeframe filter control

const timeButtons = document.querySelectorAll(".time-filters button");
const searchInput = document.getElementById("searchInput");
const timeDisplay = document.getElementById("clickedTimeDisplay"); // The element to show the clicked time

let clickedTime = "24h"; // Default time selected

// Set the default values on page load
searchInput.placeholder = `Search New Tokens (${clickedTime})`;
timeDisplay.textContent = `${clickedTime}`; // Display the default selected time
timeButtons.forEach((button) => {
  if (button.textContent === clickedTime) {
    button.classList.add("active"); // Add active class to default button
  }
});

timeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const timeframe = button.textContent;
    searchInput.placeholder = `Search New Tokens (${timeframe})`;

    timeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    clickedTime = timeframe; // Store the clicked time
    timeDisplay.textContent = `${clickedTime}`; // Update the displayed text with the clicked time
  });
});

// Quick-Buy Button

const quickBuyInput = document.getElementById("quick-buy-btn");

quickBuyInput.addEventListener("focus", () => {
  if (quickBuyInput.value.endsWith(" XRP")) {
    quickBuyInput.value = quickBuyInput.value.replace(" XRP", ""); // Remove XRP when focusing
  }
});

quickBuyInput.addEventListener("blur", () => {
  let value = quickBuyInput.value.replace(/[^\d]/g, ""); // Remove non-numeric characters
  if (value) {
    quickBuyInput.value = value + " XRP";
  } else {
    quickBuyInput.value = ""; // Allow full clearing
  }
});

// customize-Modal

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".customize-modal");
  const openModalBtn = document.querySelector(".customize-btn");
  const closeModalBtn = document.querySelector(".cust-modal-close-btn");
  const tabButtons = document.querySelectorAll(".cust-header-btns");
  const contentSections = document.querySelectorAll(".modal-content");

  openModalBtn?.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeModalBtn?.addEventListener("click", closeModal);

  function closeModal() {
    modal.classList.remove("show");
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) =>
        btn.classList.remove("cus-modal-header-active")
      );
      this.classList.add("cus-modal-header-active");

      contentSections.forEach((section) => section.classList.remove("active"));

      const target = this.getAttribute("data-target");
      document.getElementById(target).classList.add("active");
    });
  });

  document.querySelector(".cust-header-btns.cus-modal-header-active")?.click();

  // Close modal when clicking outside content area
  modal?.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
});
