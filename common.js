$(function() {

    particlesJS(
        "particles-js",
        {
            "particles":{
                "number":{
                    "value":24,
                    "density":{
                        "enable":true,
                        "value_area":868.0624057955
                    }
                },
                "color":{
                    "value":"#ffffff"
                },
                "shape":{
                    "type":"circle",
                    "stroke":{
                        "width":0,
                        "color":"#242528"
                    },
                    "polygon":{
                        "nb_sides":3
                    },
                    "image":{
                        "src":"img/github.svg",
                        "width":100,
                        "height":100
                    }
                },
                "opacity":{
                    "value":0.42613972648142723,
                    "random":true,
                    "anim":{
                        "enable":false,
                        "speed":1,
                        "opacity_min":0.1,
                        "sync":false
                    }
                },
                "size":{
                    "value":26,
                    "random":true,
                    "anim":{
                        "enable":false,
                        "speed":4.872463273808071,
                        "size_min":2.3976023976023977,
                        "sync":false
                    }
                },
                "line_linked":{
                    "enable":true,
                    "distance":500,
                    "color":"#eaeaea",
                    "opacity":0.2762016745712954,
                    "width":1.5
                },
                "move":{
                    "enable":true,
                    "speed":0.432,
                    "direction":"none",
                    "random":false,
                    "straight":false,
                    "out_mode":"out",
                    "bounce":false,
                    "attract":{
                        "enable":false,
                        "rotateX":710.2328774690454,
                        "rotateY":789.1476416322727
                    }
                }
            },
            "interactivity":{
                "detect_on":"canvas",
                "events":{
                    "onhover":{
                        "enable":false,
                        "mode":"repulse"
                    },
                    "onclick":{
                        "enable":true,
                        "mode":"push"
                    },
                    "resize":true
                },
                "modes":{
                    "grab":{
                        "distance":219.26084732136317,
                        "line_linked":{
                            "opacity":1
                        }
                    },
                    "bubble":{
                        "distance":491.50849150849155,
                        "size":95.90409590409591,
                        "duration":0.8932849335314796,
                        "opacity":0.4953670995038205,
                        "speed":3
                    },
                    "repulse":{
                        "distance":341.0724291665649,
                        "duration":0.4
                    },
                    "push":{
                        "particles_nb":4
                    },
                    "remove":{
                        "particles_nb":2
                    }
                }
            },
            "retina_detect":true
        }
    );

    $('.has-animate').addClass('block-hidden').viewportChecker({
        classToAdd: 'block-visible animated fadeInUp',
        offset: 200
    })

    setTimeout(function() {
        $('.company-label').addClass('anim');
    }, 800);

    $('.slogan-block .text-block, .slogan-block .btn-wrap, .main-footer .links').addClass('anim');

    $('.callback-block button').click(function() {
        $('.overlay').fadeIn(150);
        $('.order-popup').css({
            'top': $(document).scrollTop() + 80 + 'px'
        }).fadeIn(150);
    });

    $('.overlay, .close-btn').click(function() {
        $('.overlay').fadeOut(150).removeClass('different');
        $('.popup').fadeOut(150).removeClass('open');
    });

    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init(){     
        myMap = new ymaps.Map("map", {
            center: [56.81969029, 60.58962530],
            zoom: 17,
            controls: []
        });

        myPlacemark = new ymaps.Placemark([56.81947260, 60.59194273], {
            hintContent: 'Рекламный знак',
            balloonContent: '<b>Екатеринбург</b> <br> улица Шейнкмана  121'
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
    }

    var moreArticlesSwiper = new Swiper('.more-articles .swiper-container', {
        scrollbar: '.swiper-scrollbar',
        spaceBetween: 16,
        grabCursor: true,
        slidesPerView: 4,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        scrollbarHide: false,
        breakpoints: {
            1022: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            620: {
                slidesPerView: 1,
                spaceBetween: 15
            }
        }
    });

    var aboutDirectionSlier = $('.bxslider').bxSlider({
        pager: true,
        onSlideBefore: function($slideElement, oldIndex, newIndex) {
            $('.custom-pager .item').removeClass('active');

            $('.custom-pager .item[data-slide-index="' + newIndex + '"]').addClass('active');
        }
    });

    $('.custom-pager .item').click(function() {
        var dataSlide = $(this).attr('data-slide-index');

        $('.custom-pager .item').removeClass('active');
        $(this).addClass('active');
        aboutDirectionSlier.goToSlide(dataSlide);
    });

    var ourTeamSlider = new Swiper('.our-team .swiper-container', {
        slidesPerView: 6,
        scrollbar: '.swiper-scrollbar',
        scrollbarHide: false,
        grabCursor: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
            1022: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            620: {
                slidesPerView: 1,
                spaceBetween: 15
            }
        }
    });

    var companyLogosSlider = new Swiper('.our-clients .swiper-container', {
        slidesPerView: 8,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        scrollbar: '.swiper-scrollbar',
        scrollbarHide: false,
        grabCursor: true,
        breakpoints: {
            1022: {
                slidesPerView: 3
            },
            620: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 15
            }
        }
    });

    $('.vacancies-block .item .right-side').each(function() {
        if($(this).height() > 345) {
            $(this).find('.slideToggle-block').css({
                'height': '345px',
                'overflow': 'hidden'
            }).parent().find('.view-all').show();
        }
        if ($(this).height() > 150) {
            console.log(1);
            $(this).find('.slideToggle-block').css({
                'height': '148px',
                'overflow': 'hidden'
            }).parent().find('.view-all').show();
        }
    });

    $(window).resize(function() {
        if($(window).width() < 620) {
            $('.input-item.comm input, .input-item.comm textarea').attr('placeholder', 'Комментарий');
        } else {
            $('.input-item.comm input, .input-item.comm textarea').attr('placeholder', 'Комментарий, прикрепите резюме');
        }
    });

    $('.view-all span').click(function() {
        $(this).parents('.right-side').find('.slideToggle-block').css({
            'height': $(this).parents('.right-side').find('.slideToggle-block .inner-block').height() + 'px'
        });

        $(this).parent().hide();
    });

    $('.toggle-menu-btn button').click(function() {
        if($(this).hasClass('open')) {
            $('.mobile-menu .menu').removeClass('open');
            $(this).removeClass('open');

            return;
        }
        $('.mobile-menu .menu').addClass('open');
        $(this).addClass('open');
    });

    $('.watch-video').click(function(e) {
        e.preventDefault();

        $('.overlay').fadeIn(150);
        $('.video-popup').css({
            'top': $(document).scrollTop() + 10 + 'px'
        }).fadeIn(150);
    });


    $('form input[type=file]').on('change', function() {
        $('.file-item label').addClass('upload-file');
    });

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false,
        inp = $('.file-item input[type=file]');

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        $('.name-upload-file').text( file_name );
    });

    $('.facts-about-us .right-side .slider-block').bxSlider({
        pager: true,
        slideWidth: 217,
        slideMargin: 10,
        infiniteLoop: false,
        controls: false,
        auto: 6000
    })

    $('.fancybox').fancybox();

    $(document).scroll(function() {
        if($(document).scrollTop() > 0) {
            $('.main-wrapper').addClass('fixed-menu');
            $('.main-header .company-label').removeClass('anim').css({
                'height': '76px'
            });
            $('.main-header').addClass('fixed');
        } else {
            $('.main-wrapper').removeClass('fixed-menu');
            $('.main-header .company-label').addClass('anim').css({
                'height': ''
            });
            $('.main-header').removeClass('fixed');
        }
    });

    $('.promotion-btn').click(function() {
        $('.overlay').addClass('different').fadeIn(150);
        $('.promotion-popup').addClass('open');
    });

    $('.development-btn').click(function() {
        $('.overlay').addClass('different').fadeIn(150);
        $('.development-popup').addClass('open');
    });

    $('.automation-btn').click(function() {
        $('.overlay').addClass('different').fadeIn(150);
        $('.automation-popup').addClass('open');
    });

    $('.preloader').fadeOut(300);

});

















