$(document).ready(function() {
    $('.burger').click(function() {
        $(this).toggleClass('active');
        $('.header_mobile-menu').toggleClass('active');
        $('.header_mobile-top').toggleClass('active')
    });

    $('.heading').click(function() {
        $(this).toggleClass('active');
    });

    /* Инициализация слайдеров */
    function carouselInitialized() {
        const percent = 100 / $('.banner_slider-switch').data('count');
        $('.banner_slider-switch .after').css("width", `${percent}%`);
    }
    $('.banner_slider').owlCarousel({
        loop:true,
        autoplay: true,
        autoplayHoverPause: true,
        items: 1,
        nav: false,
        dots: false,
        onInitialized: carouselInitialized,
    })
    .on('translated.owl.carousel', function() {
        let index = $('.owl-item.active .banner_slider-item').data('slide') + 1;
        if(index < 10) {
            index = "0" + index;
        }
        $('.current_slide').text(index);
        const percent = 100 / $('.banner_slider-switch').data('count') * index;
        $('.banner_slider-switch .after').css("width", `${percent}%`);
    });    

    $('.advantages_slider').owlCarousel({
        loop:true,
        items: 3,
        nav: true,
        navText: [
            '<div class="arrow arrow-left"></div>',
            '<div class="arrow arrow-right"></div>',
        ],
        navContainer: '.advantages_nav',
        dots: false,
        stagePadding: 15,
        margin: 30,
        responsive: {
            0: {
                items: 1,
            },
            800: {
                items: 2,
            },
            1024: {
                items: 3
            }
        },
    })
});