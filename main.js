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
    });

    function partnersCarouselInitialized() {
        $('.partners_slider .owl-item').innerHeight('auto');
        setTimeout(() => {
            let maxHeight = 0;
            $('.partners_slider .owl-item').each(function() {
                const currentHeight = $(this).innerHeight(); 
                if(currentHeight > maxHeight) {
                    maxHeight = currentHeight;
                }
            });
            $('.partners_slider .owl-item').innerHeight(maxHeight);
        }, 100);        
    }

    $('.partners_slider').owlCarousel({
        loop:true,
        nav: true,
        navText: [
            '<div class="arrow arrow-left"></div>',
            '<div class="arrow arrow-right"></div>',
        ],
        navContainer: '.partners_slider-nav',
        dots: false,
        stagePadding: 25,
        margin: 30,
        onInitialized: partnersCarouselInitialized(),
        responsive: {
            0: {
                items: 1,
                margin: 10,
                stagePadding: 0,
            },
            1024: {
                items: 2
            }
        },
    })
    .on('resized.owl.carousel', function() {
        partnersCarouselInitialized()
    })
    .on('refreshed.owl.carousel', function() {
        partnersCarouselInitialized()
    });
    

    // Переключение табов в блоке Продукты на главной
    $('.tab_buttons button').click(function() {
        $(this).closest('.tabs').find("[data-tab]").removeClass('active');
        $(this).closest('.tabs').find(`[data-tab="${$(this).data('tab')}"]`).addClass('active');
    });

    
    if($('.service_content-slider .service_card').length > 2) {
        const changeIndex = () => {
            const countCard = Number($('.service_card.active').data('card')) === 0 ? $('.service_content-slider .service_card').length : Number($('.service_card.active').data('card'));
            $('.service_nav-count .current_card').text(countCard < 10 ? "0" + countCard : countCard);
        }
        $('.service_nav-arrows .arrow-right').click(function() {
            $('.service_card.active').removeClass('active');
            $('.service_card.show').first().removeClass('show').addClass('active');
            $('.service_card.show').last().next().addClass('show');                       
            $('.service_content-slider').append($('.service_card').first());
            changeIndex();
        });
        $('.service_nav-arrows .arrow-left').click(function() {
            $('.service_card.active').removeClass('active').addClass('show');
            $('.service_card.show').last().removeClass('show');
            $('.service_card').first().addClass('active');
            $('.service_content-slider').prepend($('.service_card').last());   
            changeIndex();
        });
    } else {
        $('.service_nav-arrows').hide();
    }
});