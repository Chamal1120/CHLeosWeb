document.addEventListener("DOMContentLoaded", function () {
    const spinnerWrapperEl = document.querySelector('.spinner');
    const hmIcon = document.getElementById("hmIcon");
    const navLinks = document.querySelector("nav ul");
    const overlay = document.getElementById("overlay");
    const nav = document.querySelector("nav");
    const navItems = document.querySelectorAll("nav ul li");
    const backgroundImageEl = document.querySelector(".background-image");
  
    let prevScrollPos = window.scrollY;
    let isAtTop = true;
  
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
  
    hmIcon.addEventListener("pointerdown", function (event) {
        if (!navLinks.classList.contains("show")) {
          navLinks.classList.add("show");
          overlay.classList.add("active");
          hmIcon.classList.add("active");
          toggleScroll();
          event.target.setPointerCapture(event.pointerId);
        } else {
          navLinks.classList.remove("show");
          overlay.classList.remove("active");
          hmIcon.classList.remove("active");
          toggleScroll();
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
  
    function scrollHandler() {
      updateNavBlur();
      updateBackgroundStyles();
      requestAnimationFrame(scrollHandler);
    }
  
    window.addEventListener("scroll", () => {
      if (isAtTop) {
        requestAnimationFrame(scrollHandler);
      }
    });
  
    window.addEventListener('load', () => {
      spinnerWrapperEl.style.opacity = '0';
  
      setTimeout(() => {
        spinnerWrapperEl.style.display = 'none';
      }, 200);
    });
  });


  document.addEventListener("DOMContentLoaded", function () {
    // Select all executive cards
    const executiveCards = document.querySelectorAll(".executive-card");
  
    // Select the "View All" button
    const viewAllButton = document.getElementById("view-all-button");
  
    // Track the visibility state
    let isHidden = true;
  
    // Determine the card limit based on screen width
    let cardLimit = window.innerWidth >= 992 ? 6 : 4;
  
    // Function to update the card limit based on screen width
    function updateCardLimit() {
      cardLimit = window.innerWidth >= 992 ? 6 : 4;
      
      // Initially hide extra executive cards based on the new limit
      for (let i = 0; i < executiveCards.length; i++) {
        if (i >= cardLimit) {
          executiveCards[i].style.display = "none";
        } else {
          executiveCards[i].style.display = "block";
        }
      }
      
      // Reset the "View All" button text
      viewAllButton.textContent = "View All";
      isHidden = true;
    }
  
    // Call the updateCardLimit function initially
    updateCardLimit();
  
    // Add a click event listener to toggle the visibility of hidden cards
    viewAllButton.addEventListener("click", function () {
      for (let i = cardLimit; i < executiveCards.length; i++) {
        if (isHidden) {
          // Reveal hidden cards with fade-in and scroll-down animation
          executiveCards[i].style.display = "block";
          animateFadeInAndScrollDown(executiveCards[i]);
        } else {
          // Hide cards with fade-out animation
          fadeOut(executiveCards[i]);
        }
      }
  
      // Toggle the text of the button
      viewAllButton.textContent = isHidden ? "Collapse" : "View All";
      isHidden = !isHidden;
    });
  
    // Helper function to fade in and scroll down an element
    function animateFadeInAndScrollDown(element) {
      element.style.opacity = 0;
      element.style.transform = "translateY(-15px)";
      element.style.display = "block";
      let opacity = 0;
      let translateY = -10;
      const fadeInterval = setInterval(function () {
        opacity += 0.1;
        translateY += 1;
        element.style.opacity = opacity;
        element.style.transform = `translateY(${translateY}px)`;
        if (opacity >= 1) {
          clearInterval(fadeInterval);
        }
      }, 30);
    }
  
    // Helper function to fade out an element
    function fadeOut(element) {
      let opacity = 1;
      const fadeInterval = setInterval(function () {
        opacity -= 0.1;
        element.style.opacity = opacity;
        if (opacity <= 0) {
          element.style.display = "none";
          clearInterval(fadeInterval);
        }
      }, 30);
    }
  
    // Add a window resize event listener to update the card limit
    window.addEventListener("resize", updateCardLimit);
  });
  