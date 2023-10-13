document.addEventListener("DOMContentLoaded", function () {
  const spinnerWrapperEl = document.querySelector(".spinner");
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
  let isThrottled = false;
  let cardLimit = 0;
  let isHidden = true;

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
      if (index < cardLimit) {
        card.style.display = "block";
        const images = card.querySelectorAll("img");
        images.forEach((image) => {
          image.loading = "lazy";
        });
      } else {
        card.style.display = "none";
      }
    });

    viewAllButton.textContent = isHidden ? "View All" : "Collapse";
  }

  function scrollHandler() {
    updateNavBlur();
    updateBackgroundStyles();
    requestAnimationFrame(scrollHandler);
  }

  function throttleScrollHandler() {
    if (!isThrottled && isAtTop) {
      isThrottled = true;
      requestAnimationFrame(scrollHandler);
      setTimeout(() => {
        isThrottled = false;
      }, 100);
    }
  }

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

  window.addEventListener("scroll", throttleScrollHandler);

  const container = document.querySelector(".newsletter-container");
  const scrollLeftButton = document.getElementById("scroll-left");
  const scrollRightButton = document.getElementById("scroll-right");

  function scrollLeft() {
    container.scrollBy({ left: -350, behavior: "smooth" });
  }

  function scrollRight() {
    container.scrollBy({ left: 350, behavior: "smooth" });
  }

  scrollLeftButton.addEventListener("click", scrollLeft);
  scrollRightButton.addEventListener("click", scrollRight);
  scrollLeftButton.style.opacity = "0";

  container.addEventListener("scroll", function () {
    if (container.scrollLeft === 0) {
      scrollLeftButton.style.opacity = "0";
    } else {
      scrollLeftButton.style.opacity = "1";
    }
  });

  updateCardLimit();

  function removeLoadingSpinner() {
    const spinnerContainer = document.querySelector(".spinner-container");
    if (spinnerContainer) {
      spinnerContainer.remove();
    }
  }

  window.addEventListener("load", removeLoadingSpinner);
});
