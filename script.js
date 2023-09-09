document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const spinnerWrapperEl = document.querySelector('.spinner');
  const hmIcon = document.getElementById("hmIcon");
  const nav = document.querySelector("nav");
  const navLinks = nav.querySelector("ul");
  const overlay = document.getElementById("overlay");
  const navItems = document.querySelectorAll("nav ul li");
  const backgroundImageEl = document.querySelector(".background-image");
  const executiveCards = document.querySelectorAll(".executive-card");
  const viewAllButton = document.getElementById("view-all-button");
  let isAtTop = true;
  let prevScrollPos = window.scrollY;
  let isThrottled = false; // Throttle flag
  let cardLimit = 0; // Initialize cardLimit variable
  let isHidden = true; // Initialize isHidden variable

  // Helper functions
  function toggleScroll() {
    const shouldScroll = !navLinks.classList.contains("show");
    document.body.style.overflow = shouldScroll ? "auto" : "hidden";
  }

  function updateNavBlur() {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      isAtTop = false;
      nav.classList.add("blurred");
    } else {
      if (currentScrollPos === 0) {
        isAtTop = true;
        nav.classList.remove("blurred");
      }
    }
    prevScrollPos = currentScrollPos;
  }

  function updateBackgroundStyles() {
    const scrollPosition = window.scrollY;
    const blurValue = Math.min(scrollPosition / 50, 5);
    const opacityValue = Math.max(0.2 - scrollPosition / 1000, 0);
    backgroundImageEl.style.setProperty("--blur-value", blurValue + "px");
    backgroundImageEl.style.setProperty("--opacity-value", opacityValue);
  }

  function updateCardLimit() {
    cardLimit = window.innerWidth >= 992 ? 6 : 4;

    executiveCards.forEach((card, index) => {
      card.style.display = index < cardLimit ? "block" : "none";
    });

    viewAllButton.textContent = isHidden ? "View All" : "Collapse";
  }

  function scrollHandler() {
    updateNavBlur();
    updateBackgroundStyles();
    requestAnimationFrame(scrollHandler); // Recursive call using requestAnimationFrame
  }

  // Throttle scroll event to limit the rate of function calls
  function throttleScrollHandler() {
    if (!isThrottled && isAtTop) {
      isThrottled = true;
      requestAnimationFrame(scrollHandler);
      setTimeout(() => {
        isThrottled = false;
      }, 100); // Adjust the throttle delay as needed
    }
  }

  // Event listeners
  hmIcon.addEventListener("pointerdown", function (event) {
    const shouldShow = !navLinks.classList.contains("show");
    navLinks.classList.toggle("show", shouldShow);
    overlay.classList.toggle("active", shouldShow);
    hmIcon.classList.toggle("active", shouldShow);
    toggleScroll();
    if (shouldShow) {
      event.target.setPointerCapture(event.pointerId);
    } else {
      event.target.releasePointerCapture(event.pointerId);
    }
  });

  navItems.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("show");
      overlay.classList.remove("active");
      hmIcon.classList.remove("active");
      toggleScroll();
    });
  });

  viewAllButton.addEventListener("click", function () {
    for (let i = cardLimit; i < executiveCards.length; i++) {
      executiveCards[i].style.display = isHidden ? "block" : "none";
    }

    viewAllButton.textContent = isHidden ? "Collapse" : "View All";
    isHidden = !isHidden;
  });

  window.addEventListener("scroll", throttleScrollHandler); // Attach throttled scroll event listener

  // Variables for Newsletter Container
  const container = document.querySelector(".newsletter-container");
  const scrollLeftButton = document.getElementById("scroll-left");
  const scrollRightButton = document.getElementById("scroll-right");

  // Function to scroll left
  function scrollLeft() {
    container.scrollBy({ left: -350, behavior: "smooth" }); // Adjust the scroll amount as needed
  }

  // Function to scroll right
  function scrollRight() {
    container.scrollBy({ left: 350, behavior: "smooth" }); // Adjust the scroll amount as needed
  }

  // Add click event listeners to the buttons
  scrollLeftButton.addEventListener("click", scrollLeft);
  scrollRightButton.addEventListener("click", scrollRight);

  // Hide the left indicator initially
  scrollLeftButton.style.opacity = "0"; // Set opacity to make it invisible

  // Check the scroll position to toggle left indicator visibility
  container.addEventListener("scroll", function () {
    if (container.scrollLeft === 0) {
      scrollLeftButton.style.opacity = "0"; // Hide when at the leftmost position
    } else {
      scrollLeftButton.style.opacity = "1"; // Make it visible when scrolling starts
    }
  });

  // Initial setup for both Navigation Menu and Newsletter Container
  updateCardLimit();

  // Function to remove the loading spinner
  function removeLoadingSpinner() {
    const spinnerContainer = document.querySelector(".spinner-container");
    if (spinnerContainer) {
      spinnerContainer.remove();
    }
  }

  // Attach the "load" event listener to the window
  window.addEventListener("load", removeLoadingSpinner);
});
