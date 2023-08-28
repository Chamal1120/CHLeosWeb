// loading spinner trigger
const sipnnerWrapperE1 = document.querySelector('.spinner');

window.addEventListener('load', () => {
    sipnnerWrapperE1.style.opacity = '0';

    setTimeout(() => {
        sipnnerWrapperE1.style.display = 'none';
    }, 200);

});

document.addEventListener("DOMContentLoaded", function() {
    const hmIcon = document.getElementById("hmIcon");
    const navLinks = document.querySelector("nav ul");
    const navLinksList = document.querySelectorAll("nav ul li");
    const overlay = document.getElementById("overlay");
  
    hmIcon.addEventListener("click", function() {
      navLinks.classList.toggle("show");
      overlay.classList.toggle("active");
    });
  
    navLinksList.forEach(function(link) {
      link.addEventListener("click", function() {
        navLinks.classList.remove("show");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    });
  });
   
document.addEventListener("DOMContentLoaded", function() {
  const nav = document.querySelector("nav");
  let prevScrollPos = window.scrollY;
  let isAtTop = true;

  window.addEventListener("scroll", function() {
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
  });
});


document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      const blurValue = Math.min(scrollPosition / 50, 5);
      const opacityValue = Math.max(0.2 - scrollPosition / 1000, 0);

      document.querySelector(".background-image").style.setProperty("--blur-value", blurValue + "px");
      document.querySelector(".background-image").style.setProperty("--opacity-value", opacityValue);
    });
});






  


