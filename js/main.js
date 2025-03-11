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

  // Wrap the content for the marquee effect
  wrapper.innerHTML = `<div class="marquee-track">${content}${content}</div>`;
});

// Timeframe filter control

const timeButtons = document.querySelectorAll(".time-filters button");
const searchInput = document.getElementById("searchInput");

timeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const timeframe = button.textContent;
    searchInput.placeholder = `Search New Tokens (${timeframe})`;

    timeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
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
