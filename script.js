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
  
    hmIcon.addEventListener("click", function() {
      navLinks.classList.toggle("show");
    });
  
    navLinksList.forEach(function(link) {
      link.addEventListener("click", function() {
        navLinks.classList.remove("show");
      });
    });
  });
   


// blurred navbar trigger
document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector(".navbar");
    navbar.classList.remove("blurred-navbar");
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 0) {
            navbar.classList.add("blurred-navbar");
        } else {
            navbar.classList.remove("blurred-navbar");
        }
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






  


