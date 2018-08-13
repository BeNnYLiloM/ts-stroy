$(document).ready(function () {

    var $body = $('body');
    var $overlay = $('.overlay');
    var $menu = $('.menu');

    $(".youtube").each(function() {
        // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
        $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

        // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
        $(this).append($('<div/>', {'class': 'play'}));

        $(document).delegate('#'+this.id, 'click', function() {
            // создаем iframe со включенной опцией autoplay
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

            console.log(this.id);

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

            // Заменяем миниатюру HTML5 плеером с YouTube
            $(this).replaceWith(iframe);
        });
    });

    $('.menu__btn').click(function () {
        if ($menu.hasClass('_open')) {
            $menu.removeClass('_open');
            $body.removeClass('_open-menu');
        } else {
            $menu.addClass('_open');
            $body.addClass('_open-menu');
        }
    });

    $('.main-header__overlay').click(function () {
        $menu.removeClass('_open');
        $body.removeClass('_open-menu');
    });

    $overlay.click(function () {
        $overlay.removeClass('_show');
    });

    $('.main-slider__item__title, .main-slider__item__title-big').each(function () {
        var numbColor = $(this).attr('data-color');

        $(this).css({
            'color': numbColor
        });
    });

    $('.main-slider__item').click(function () {
        $('.main-slider__item').removeClass('_active');
        $(this).addClass('_active');
    });

    function counter (el) {
        var n = Number(el.text());

        el.animateNumber({
            number: n
        });

        el.closest('.spincrement').addClass('_spin-done');
    }

    $('.about__item.viewport-checker').viewportChecker({
        classToAdd: 'spincrement',
        offset: 200,
        callbackFunction: function () {
            counter($('.spincrement:not(._spin-done) .about__item__numbers-big'));
        }
    });

    $('.nav-page__dots__item').click( function() {
        var scroll_el = $(this).attr('href');

        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 100 }, 500);
        }

        $('.nav-page__dots__item').removeClass('_active');
        $(this).addClass('_active');

        return false;
    });

    var myLazyLoad = new LazyLoad({
        elements_selector: ".lazy",
        threshold: 0,
    });

    var aboutVideosSlide = $('.about-videos__slider').slick({
        infinite: true,
        fade: true,
        speed: '500',
        prevArrow: '<div class="about-videos__slider__btn-wrap"><div class="container"><button type="button" class="slick-prev"><svg class="icon icon-arrow-slider-left"><use xlink:href="/static/img/svg/symbol/sprite.svg#arrow-slider-left"></use></svg></button></div></div>',
        nextArrow: '<div class="about-videos__slider__btn-wrap"><div class="container"><button type="button" class="slick-next"><svg class="icon icon-arrow-slider-right"><use xlink:href="/static/img/svg/symbol/sprite.svg#arrow-slider-right"></use></svg></button></div></div>',
    });

    aboutVideosSlide.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.about-videos__slider-item._prev-slide').removeClass('_prev-slide');
        $(slick.$slides[currentSlide]).addClass('_prev-slide');
        $('.about-videos__count-slides__current').text(nextSlide + 1);
    });

    $('.about-videos__count-slides__all span').text($('.about-videos__slider-item').length);

    var howWeWorkItems = $('.how-we-work__item');

    for (var i = howWeWorkItems.length - 1; i >= howWeWorkItems.length - 3; i--) {
        $(howWeWorkItems[i]).addClass('_last');
    }

    var dSeparateX = 0;
    var dSeparateY = 80;
    var scaleStep = 0.08;

    function slideImgs (block) {
        var slides = block.find('.services__item__img');
        var countSlides = slides.length;
        var scale = 1;
        var translateX = 0;
        var zi = countSlides;
        var separateX;

        separateX = (100 - (block.width() - block.find('.services__item__img:first-child').width()) / block.width() * 100 / (countSlides - 1)) / (countSlides - 1);

        for (var i = 0; i <= countSlides - 1; i++) {
            if (i === 0) {
                if ($(block.closest('.services__item')).hasClass('services__item--imgs-left')) {
                    translateX -= separateX;
                } else if ($(block.closest('.services__item')).hasClass('services__item--imgs-right')) {
                    translateX += separateX;
                }
                
                $(slides[i])
                    .addClass('_active')
                    .css({
                        'z-index': zi
                    })
                    .attr('data-transX', 0)
                    .attr('data-scale', scale)
                    .attr('data-zindex', zi);
                scale -= scaleStep;
            } else {
                $(slides[i])
                    .css({
                        'transform': 'translateX(' + translateX + '%) scale(' + scale + ')',
                        'z-index': zi
                    })
                    .attr('data-transX', translateX)
                    .attr('data-scale', scale)
                    .attr('data-zindex', zi);

                if ($(block.closest('.services__item')).hasClass('services__item--imgs-left')) {
                    translateX -= separateX;
                } else if ($(block.closest('.services__item')).hasClass('services__item--imgs-right')) {
                    translateX += separateX;
                }
                scale -= scaleStep;
            }

            zi--;
        }

        $(block).closest('.services__item').removeClass('_go-anim').addClass('_ready-anim');
    }

    function documentsImgSlider (block) {
        var slides = block.find('.services__documents__img');
        var countSlides = slides.length;
        var translateX = 0;
        var translateY = dSeparateY;
        var zi = countSlides;
        var blockHeight = block.height();

        dSeparateX = ((block.width() - 40) - block.find('.services__documents__img').width()) / block.width() * 100 / (countSlides - 1);

        block.css({
            'height': blockHeight + translateY * (countSlides - 1)
        });

        for (var i = 0; i <= countSlides - 1; i++) {
            if (i === 0) {
                translateX += dSeparateX;
                $(slides[i])
                    .addClass('_active')
                    .css({
                        'z-index': zi
                    })
                    .attr('data-transX', 0)
                    .attr('data-transY', 0)
                    .attr('data-zindex', zi);
            } else {
                $(slides[i])
                    .css({
                        'transform': 'translateX(' + translateX + '%) translateY(' + translateY + 'px)',
                        'z-index': zi
                    })
                    .attr('data-transX', translateX)
                    .attr('data-transY', translateY)
                    .attr('data-zindex', zi);

                translateX += dSeparateX;
                translateY += dSeparateY;
            }

            zi--;
        }

        $(block).closest('.services__documents').removeClass('_go-anim').addClass('_ready-anim');
    }

    var activeSlideDoc = 0;

    function moveSlide (slides, slideTransX, slideTransY, slideZindex, slideScale, slideNumber, wrap, btns) {
        var slidePos = $(slides[slideNumber]).attr('data-slide');
        var activeSlide;

        if (btns) {
            activeSlide = $(wrap).find('.services__item__img._prev').attr('data-slide');
        } else {
            activeSlide = $(wrap).find('.services__item__img._active').attr('data-slide');
        }

        if (slideScale.length !== 0) {
            $(slides[activeSlide])
                .css({
                    'transform': 'translateX(' + slideTransX[slidePos] + '%) scale(' + slideScale[slidePos] + ')',
                    'z-index': slideZindex[slidePos]
                })
                .attr('data-transX', slideTransX[slidePos])
                .attr('data-scale', slideScale[slidePos])
                .attr('data-zindex', slideZindex[slidePos]);

            $(slides[slideNumber])
                .css({
                    'transform': 'translateX(0) scale(1)',
                    'z-index': slides.length
                })
                .attr('data-transX', 0)
                .attr('data-scale', 1)
                .attr('data-zindex', slides.length);
        } else {
            $(slides[activeSlideDoc])
                .css({
                    'transform': 'translateX(' + slideTransX[slidePos] + '%) translateY(' + slideTransY[slidePos] + 'px)',
                    'z-index': slideZindex[slidePos]
                })
                .attr('data-transX', slideTransX[slidePos])
                .attr('data-transY', slideTransY[slidePos])
                .attr('data-zindex', slideZindex[slidePos]);

            $(slides[slideNumber])
                .css({
                    'transform': 'translateX(0) translateY(0)',
                    'z-index': slides.length
                })
                .attr('data-transX', 0)
                .attr('data-transY', 0)
                .attr('data-zindex', slides.length);

            activeSlideDoc = slideNumber;
        }
    }

    function sliderImgsUpdate (dataSlide, wrap, btns) {
        var slides = [];
        var slideTransX = [];
        var slideTransY = [];
        var slideScale = [];
        var slideZindex = [];

        if (wrap !== undefined) {
            slides = wrap.find('.services__item__img-wrap .services__item__img');
        } else {
            slides = $('.services__documents__img');
        }

        for (var i = 0; i <= slides.length - 1; i++) {
            slideTransX.push(Number($(slides[i]).attr('data-transX')));
            if ($(slides[i]).attr('data-transY')) {
                slideTransY.push(Number($(slides[i]).attr('data-transY')));
            }
            if ($(slides[i]).attr('data-scale')) {
                slideScale.push(Number($(slides[i]).attr('data-scale')));
            }
            slideZindex.push(Number($(slides[i]).attr('data-zindex')));
        }

        moveSlide(slides, slideTransX, slideTransY, slideZindex, slideScale, dataSlide, wrap, btns);
    }

    // documentsImgSlider($('.services__documents__img-wrap'));

    $('.services__item').each(function () {
        // slideImgs($(this).find('.services__item__img-wrap'));
    });

    $('.services__documents__item').click(function () {
        if (!$(this).hasClass('_active')) {
            $('.services__documents__item').removeClass('_active');
            $(this).addClass('_active');

            sliderImgsUpdate($(this).attr('data-slide-number'));
        }

        $('.services__documents__img').removeClass('_active _open-popup');
        $('.services__documents__img[data-slide="' + $(this).attr('data-slide-number') + '"]').addClass('_active');
    });

    $('.services__documents__img').click(function () {
        sliderImgsUpdate($(this).attr('data-slide'));
        $('.services__documents__img').removeClass('_active _open-popup');
        $(this).addClass('_active');
        $('.services__documents__item').removeClass('_active');
        $('.services__documents__item[data-slide-number="' + $(this).attr('data-slide') + '"]').addClass('_active');
    });

    $('.services__item__line').click(function () {
        var parent = $(this).closest('.services__item');

        if (!$(this).hasClass('_active')) {
            parent.find('.services__item__line').removeClass('_active');
            $(this).addClass('_active');

            sliderImgsUpdate($(this).attr('data-slide-number'), $(this).closest('.services__item'));
        }

        parent.find('.services__item__img').removeClass('_active _open-popup');
        parent.find('.services__item__img[data-slide="' + $(this).attr('data-slide-number') + '"]').addClass('_active');
        parent.find('.services__item__numbers-current span').text(Number($(this).attr('data-slide-number')) + 1);
    });

    $('.services__documents__img-link').click(function () {
        $(this).closest('.services__documents__img').addClass('_open-popup');
    });

    $('.services__item__img-link').click(function () {
        $(this).closest('.services__item__img').addClass('_open-popup');
    });

    $('.services__item__popup-close').click(function () {
        $(this).closest('.services__documents__img, .services__item__img').removeClass('_open-popup');
    });

    $('.services__item__btns-next').click(function () {
        var parent = $(this).closest('.services__item');
        var lineItems = parent.find('.services__item__line');
        var imgsWrap = parent.find('.services__item__img');
        var currentSlide;
        var slideNumber;

        if (parent.hasClass('services__item--no-nav')) {
            currentSlide = Number(parent.find('.services__item__img._active').attr('data-slide'));
            if (currentSlide === imgsWrap.length - 1) {
                slideNumber = Number(parent.find('.services__item__img:first-child').attr('data-slide'));
            } else {
                slideNumber = Number(parent.find('.services__item__img._active').next().attr('data-slide'));
            }
        } else {
            currentSlide = Number(parent.find('.services__item__line._active').attr('data-slide-number'));
            slideNumber = Number(parent
                            .find('.services__item__line._active')
                            .removeClass('_active')
                            .next()
                            .addClass('_active')
                            .attr('data-slide-number'));
        }

        if (currentSlide === (lineItems.length - 1)) {
            parent.find('.services__item__line._active').removeClass('_active');
            slideNumber = Number(parent
                            .find('.services__item__line:first-child')
                            .addClass('_active')
                            .attr('data-slide-number'));
        }

        parent.find('.services__item__numbers-current span').text(slideNumber + 1);
        parent.find('.services__item__img._prev').removeClass('_prev');
        parent.find('.services__item__img._active').removeClass('_active _open-popup').addClass('_prev');
        parent.find('.services__item__img[data-slide="' + slideNumber + '"]').addClass('_active');

        sliderImgsUpdate(slideNumber, parent, btns = true);
    });

    $('.services__item__btns-prev').click(function() {
        var parent = $(this).closest('.services__item');
        var currentSlide;
        var slideNumber;

        if (parent.hasClass('services__item--no-nav')) {
            currentSlide = Number(parent.find('.services__item__img._active').attr('data-slide'));
            if (currentSlide === 0) {
                slideNumber = Number(parent.find('.services__item__img:last-child').attr('data-slide'));
            } else {
                slideNumber = Number(parent.find('.services__item__img._active').prev().attr('data-slide'));
            }
        } else {
            currentSlide = Number(parent.find('.services__item__line._active').attr('data-slide-number'));
            slideNumber = Number(parent
                            .find('.services__item__line._active')
                            .removeClass('_active')
                            .prev()
                            .addClass('_active')
                            .attr('data-slide-number'));
        }

        if (currentSlide === 0 && !parent.hasClass('services__item--no-nav')) {
            parent.find('.services__item__line._active').removeClass('_active');
            slideNumber = Number(parent
                            .find('.services__item__line:last-child')
                            .addClass('_active')
                            .attr('data-slide-number'));
        }

        parent.find('.services__item__numbers-current span').text(slideNumber + 1);
        parent.find('.services__item__img._prev').removeClass('_prev');
        parent.find('.services__item__img._active').removeClass('_active _open-popup').addClass('_prev');
        parent.find('.services__item__img[data-slide="' + slideNumber + '"]').addClass('_active');

        sliderImgsUpdate(slideNumber, parent, btns = true);
    });

    $('.services__item__img').click(function () {
        var slideNumber = Number($(this).attr('data-slide'));
        var parent = $(this).closest('.services__item');

        parent.find('.services__item__line._active').removeClass('_active');
        parent.find('.services__item__line[data-slide-number="' + slideNumber + '"]').addClass('_active');
        parent.find('.services__item__numbers-current span').text(slideNumber + 1);
        parent.find('.services__item__img._prev').removeClass('_prev');
        parent.find('.services__item__img._active').removeClass('_active _open-popup').addClass('_prev');
        parent.find('.services__item__img[data-slide="' + slideNumber + '"]').addClass('_active');

        sliderImgsUpdate(slideNumber, parent, btns = true);
    });

    $('.team__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.team__slider-nav',
        variableWidth: true,
        centerMode: true,
        prevArrow: '<button type="button" class="slick-prev"><svg class="icon icon-arrow-slider-left"><use xlink:href="/static/img/svg/symbol/sprite.svg#arrow-slider-left"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg class="icon icon-arrow-slider-right"><use xlink:href="/static/img/svg/symbol/sprite.svg#arrow-slider-right"></use></svg></button>',
    });

    $('.team__slider-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        asNavFor: '.team__slider',
        dots: true,
        arrows: false,
        focusOnSelect: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                },
            },
        ]
    });

    var partnersSlider = $('.partners__slider').slick({
        arrows: false,
    });

    $('.partners__slider-btns__prev').click(function () {
        partnersSlider.slick('slickPrev');
        $('.partners__slider-numbers__current span').text(partnersSlider.slick('slickCurrentSlide') + 1);
    });

    $('.partners__slider-btns__next').click(function () {
        partnersSlider.slick('slickNext');
        $('.partners__slider-numbers__current span').text(partnersSlider.slick('slickCurrentSlide') + 1);
    });

    $('.services__item.viewport-checker').viewportChecker({
        classToAdd: '_go-anim',
        offset: 400,
        callbackFunction: function () {
            if (!$('.services__documents').hasClass('_ready-anim')) {
                $('.services__documents__item:first-child').addClass('_active');
                documentsImgSlider($('.services__documents__img-wrap'));
            }

            slideImgs($('.services__item:not(.services__documents)._go-anim').find('.services__item__img-wrap'));
        }
    });

    function activeNav (id) {
        $('.nav-page__dots__item').removeClass('_active');
        $('.nav-page__dots__item[href="#' + id + '"]').addClass('_active');

        $('.nav-view-checker').removeClass('_active-nav');
    }

    $('.nav-view-checker').viewportChecker({
        classToAdd: '_active-nav',
        offset: 600,
        repeat: true,
        callbackFunction: function () {
            var navId = $('.nav-view-checker._active-nav').attr('id');

            activeNav(navId);
        }
    });

    ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 14,
            controls: [],
        });

        var myPlacemark = new ymaps.Placemark([55.76, 37.64], {
            hintContent: 'Содержимое всплывающей подсказки',
            balloonContent: 'Содержимое балуна'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'static/img/icons/map-label.png',
            iconImageSize: [121, 132],
            iconImageOffset: [-60, -95]
        });

        myMap.geoObjects.add(myPlacemark);
    }

    $('.main-header .search').click(function () {
        $('.main-header__search').addClass('_show');
        $body.addClass('_open-menu');
    });

    $('.main-header__search__close').click(function () {
        $('.main-header__search').removeClass('_show');
        $body.removeClass('_open-menu');
    });

    $('.custom-select').selectize();

    $('#phone-input, #phone-input-popup').mask('+ 7 (999) 999-99-99');

    $('#popupCalc').ionRangeSlider({
        min: 50,
        max: 200
    });

    $('.calculate-popup-btn').click(function () {
        $('.popup__calculate').addClass('_open');
        $body.addClass('_of-hidden');
    });

    $('.popup__close').click(function () {
        $('.popup').removeClass('_open');
        $body.removeClass('_of-hidden')
    });

    $('.main-header .phone-icon, .callback-popup-btn').click(function () {
        $body.addClass('_of-hidden');
        $('.popup__callback').addClass('_open');
    });

    $('.main-footer').click(function () {
        $(this).addClass('_active');
    });

    $(document).mouseup(function (e){
        var div = $('.main-footer');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            div.removeClass('_active');
        }
    });

    $(document).scroll(function () {
        if ($(this).scrollTop() > 170) {
            $('.main-header').addClass('_fixed');
            setTimeout(function () {
                $('.main-header').addClass('_show');
            }, 200);
        } else {
            $('.main-header').removeClass('_fixed _show');
        }
    });

    $('form#calculate').submit(function () {
        $(this).find('.callback-block__form__item').addClass('_error');

        return false;
    });

    $('.callback-block__form__input').click(function () {
        if ($(this).closest('.callback-block__form__item').hasClass('_error')) {
            $(this).closest('.callback-block__form__item').removeClass('_error');
        }
    });

    $('.how-we-work .wave-bg, .team .wave-bg').sprite({fps: 12, no_of_frames: 63});

    $('.callback-block__form__submit-inner').sprite({
        fps: 12,
        no_of_frames: 62,
        width: 500,
    })

});