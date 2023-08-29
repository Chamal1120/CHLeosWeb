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
  