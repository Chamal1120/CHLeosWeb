$(document).ready(function () {
    // Initialize Slick Carousel for each slider
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        swipe: true,
        dots: false, // Optional: Show pagination dots
        arrows: false, // Optional: Hide navigation arrows
        speed: 1000,
        easing: 'ease-in-out',
    });
});