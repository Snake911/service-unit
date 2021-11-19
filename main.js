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

    // Переключение табов в блоке Продукты на главной
    $('.tab_buttons button').click(function() {
        console.log($(this))
        $(this).closest('.tabs').find("[data-tab]").removeClass('active');
        $(this).closest('.tabs').find(`[data-tab="${$(this).data('tab')}"]`).addClass('active');
    });

    // Переключение слайдера в сервисах на главной
    if($('.service_content-slider .service_card').length > 2) {
        let timer = false;
        const changeIndex = () => {
            const countCard = Number($('.service_card.active').data('card')) + 1;
            $('.service_nav-count .current_card').text(countCard < 10 ? "0" + countCard : countCard);
        }
        $('.service_nav-arrows .arrow-right').click(function() {
            const exActive = $('.service_card.active').removeClass('active');
            $('.service_card.show').first().removeClass('show').addClass('active');
            $('.service_card.show').last().next().addClass('show');
            $('.service_card').addClass('up');
            changeIndex();
            const rightTimer = setTimeout(() => {
                $('.service_content-slider').append($(exActive).remove());
                $('.service_card').removeClass('up');
                clearTimeout(rightTimer);
            }, 500);
        });
        $('.service_nav-arrows .arrow-left').click(function() {
            $('.service_card.active').removeClass('active').addClass('show');
            $('.service_card.show').last().removeClass('show');
            const newActive = $('.service_card').last().addClass('active').remove();
            $('.service_content-slider').prepend(newActive);
            $('.service_card').addClass('down');
            changeIndex();
            const leftTimer = setTimeout(() => {
                $('.service_card').removeClass('down');
                clearTimeout(leftTimer);
            }, 500);
        });
        $(document).on('click', '.service_card.show', function() {
            if($(this).prev().prev()) {
                $('.service_content-slider').append($(this).prev().prev().remove());
            }
            $('.service_content-slider').append($(this).prev().remove());
            
            $('.service_card').removeClass('active').removeClass('show');
            $(this).removeClass('show').addClass('active').next().addClass('show').next().addClass('show');
            changeIndex();
        });
    } else {
        $('.service_nav-arrows').hide();
    }
});