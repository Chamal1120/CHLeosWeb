$(document).ready(function () {
    // Initialize Slick Carousel for each slider
    $('.slider').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        swipe: false,
        dots: false,
        arrows: false,
        speed: 1500,
        fade: true,
        cssEase: 'ease-in-out',
        infinite: true
    });
});