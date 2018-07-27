$(document).ready(function () {

    var $body = $('body');
    var $overlay = $('.overlay');
    var $menu = $('.menu');

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

    function slideImgs (block) {
        var slides = block.find('.img-slider__item');
        var countSlides = slides.length;
        var separate = block.width() - block.find('.services__documents__img').width();
        var translateX = separate / block.width() * 100 / countSlides;
        var zi = countSlides;

    }

    function documentsImgSlider (block, dataSlide) {
        var slides = block.find('.services__documents__img');
        var countSlides = slides.length;
        var separate = (block.width() - 80) - block.find('.services__documents__img').width();
        var translateX = separate / block.width() * 100 / countSlides;
        var translateY = 80;
        var zi = countSlides;
        var blockHeight = block.height();

        block.css({
            'height': blockHeight + translateY * (countSlides - 1)
        });

        for (var i = 0; i <= countSlides - 1; i++) {
            if (i === 0) {
                translateX += translateX;
                $(slides[i])
                    .addClass('_active')
                    .css({
                        'z-index': zi
                    })
                    .attr('data-transX', 0)
                    .attr('data-transY', 0);
            } else {
                $(slides[i])
                    .css({
                        'transform': 'translateX(' + translateX + '%) translateY(' + translateY + 'px)',
                        'z-index': zi
                    })
                    .attr('data-transX', translateX)
                    .attr('data-transY', translateY);

                translateX += translateX;
                translateY += translateY;
            }

            zi--;
        }
    }

    function sliderImgsUpdate (dataSlide) {
        var slides = $('.services__documents__img');
        var slideTransX = [];
        var slideTransY = [];
        var slideZindex = [];
        var step = $(slides[1]).attr('data-transX');

        for (var i = 0; i <= slides.length - 1; i++) {
            slideTransX.push(Number($(slides[i]).attr('data-transX')));
            slideTransY.push(Number($(slides[i]).attr('data-transY')));
            slideZindex.push(Number($(slides[i]).css('z-index')));
        }

        console.log(slideTransX);

        $(slides[0])
            .css({
                'transform': 'translateX(' + slideTransX[slides.length - 1] + '%) translateY(' + slideTransY[slides.length - 1] + 'px)',
                'z-index': slideZindex[slides.length - 1]
            });
            // .attr('data-transX', slideTransX[slides.length - 1])
            // .attr('data-transY', slideTransY[slides.length - 1]);

        while (dataSlide > 0) {
            for (var i = 1; i <= slides.length - 1; i++) {
                $(slides[i])
                    .css({
                        'transform': 'translateX(' + (slideTransX[i] - step) + '%) translateY(' + (slideTransY[i] - 80) + 'px)',
                        'z-index': slideZindex[i] + 1
                    });
                    // .attr('data-transX', slideTransX[i] - step)
                    // .attr('data-transY', slideTransY[i] - 80);
            }

            dataSlide--;
        }
    }

    documentsImgSlider($('.services__documents__img-wrap'));

    $('.services__documents__item').click(function () {
        if (!$(this).hasClass('_active')) {
            sliderImgsUpdate($(this).attr('data-slide'));
        }

        $('.services__documents__item').removeClass('_active');
        $(this).addClass('_active');
    });

});