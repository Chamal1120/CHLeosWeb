$(document).ready(function () {
    // Initialize Slick Carousel for each slider
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        swipe: true,
        dots: false,
        arrows: false,
        speed: 2000,
        easing: 'ease-in-out',
    });
});