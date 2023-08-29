const spinnerWrapperEl = document.querySelector('.spinner');

window.addEventListener('load', () => {
  spinnerWrapperEl.style.opacity = '0';

  setTimeout(() => {
    spinnerWrapperEl.style.display = 'none';
  }, 200);
});

document.addEventListener("DOMContentLoaded", function () {
  const hmIcon = document.getElementById("hmIcon");
  const navLinks = document.querySelector("nav ul");
  const overlay = document.getElementById("overlay");
  const nav = document.querySelector("nav");
  let prevScrollPos = window.scrollY;
  let isAtTop = true;

  function toggleScroll() {
    const shouldScroll = !navLinks.classList.contains("show");
    document.body.style.overflow = shouldScroll ? "auto" : "hidden";
  }

  function updateNavBlur() {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      // Scrolling down
      isAtTop = false;
      nav.classList.add("blurred");
    } else {
      // Scrolling up
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
    const backgroundImageEl = document.querySelector(".background-image");
    backgroundImageEl.style.setProperty("--blur-value", blurValue + "px");
    backgroundImageEl.style.setProperty("--opacity-value", opacityValue);
  }

  hmIcon.addEventListener("click", function () {
    navLinks.classList.toggle("show");
    overlay.classList.toggle("active");
    toggleScroll();
  });

  document.querySelectorAll("nav ul li").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("show");
      overlay.classList.remove("active");
      toggleScroll();
    });
  });

  window.addEventListener("scroll", () => {
    updateNavBlur();
    updateBackgroundStyles();
  });
});


document.addEventListener("DOMContentLoaded", function () {
    const hmIcon = document.getElementById("hmIcon");
  
    hmIcon.addEventListener("click", function () {
      hmIcon.classList.toggle("active");
    });
  });