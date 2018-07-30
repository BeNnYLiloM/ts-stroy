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

    var dSeparateX = 0;
    var dSeparateY = 80;
    var scaleStep = 0.08;

    function slideImgs (block) {
        var slides = block.find('.services__item__img');
        var countSlides = slides.length;
        var scale = 1;
        var translateX = 0;
        var zi = countSlides;
        var blockHeight = block.height();

        dSeparateX = ((block.width() - 40) - block.find('.services__item__img').width()) / block.width() * 100 / (countSlides - 1);

        for (var i = 0; i <= countSlides - 1; i++) {
            if (i === 0) {
                translateX += dSeparateX;
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

                translateX += dSeparateX;
                scale -= scaleStep;
            }

            zi--;
        }
    }

    function documentsImgSlider (block) {
        var slides = block.find('.services__documents__img');
        var countSlides = slides.length;
        // var separateX = ((block.width() - 60) - block.find('.services__documents__img').width()) / block.width() * 100 / countSlides;
        // var separateY = 80;
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
    }

    var activeSlideDoc = 0;

    function moveSlide (slides, slideTransX, slideTransY, slideZindex, slideNumber) {
        var slidePos = $(slides[slideNumber]).attr('data-slide');

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

    function sliderImgsUpdate (dataSlide) {
        var slides = $('.services__documents__img');
        var slideTransX = [];
        var slideTransY = [];
        var slideZindex = [];

        for (var i = 0; i <= slides.length - 1; i++) {
            slideTransX.push(Number($(slides[i]).attr('data-transX')));
            slideTransY.push(Number($(slides[i]).attr('data-transY')));
            slideZindex.push(Number($(slides[i]).attr('data-zindex')));
        }

        moveSlide(slides, slideTransX, slideTransY, slideZindex, dataSlide);
    }

    documentsImgSlider($('.services__documents__img-wrap'));

    $('.services__item').each(function () {
        slideImgs($(this).find('.services__item__img-wrap'));
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

    $('.services__documents__img-link').click(function () {
        $(this).closest('.services__documents__img').addClass('_open-popup');
    });

    $('.services__item__popup-close').click(function () {
        $(this).closest('.services__documents__img').removeClass('_open-popup');
    });

});