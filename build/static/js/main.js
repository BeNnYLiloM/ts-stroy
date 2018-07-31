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
        var separateX;

        console.log($(block.closest('.services__item')).hasClass('services__item--imgs-left'));

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

    function moveSlide (slides, slideTransX, slideTransY, slideZindex, slideScale, slideNumber) {
        var slidePos = $(slides[slideNumber]).attr('data-slide');

        if (slideScale.length !== 0) {
            $(slides[activeSlideDoc])
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

            activeSlideDoc = slideNumber;
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

    function sliderImgsUpdate (dataSlide, wrap) {
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

        moveSlide(slides, slideTransX, slideTransY, slideZindex, slideScale, dataSlide);
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

    $('.services__item__line').click(function () {
        var parent = $(this).closest('.services__item');

        if (!$(this).hasClass('_active')) {
            $('.services__item__line').removeClass('_active');
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
        var currentSlide = Number(parent.find('.services__item__line._active').attr('data-slide-number'))
        var slideNumber = Number(parent
                            .find('.services__item__line._active')
                            .removeClass('_active')
                            .next()
                            .addClass('_active')
                            .attr('data-slide-number'));

        if (currentSlide === (lineItems.length - 1)) {
            parent.find('.services__item__line._active').removeClass('_active');
            slideNumber = Number(parent
                            .find('.services__item__line:first-child')
                            .addClass('_active')
                            .attr('data-slide-number'));
        }

        parent.find('.services__item__numbers-current span').text(slideNumber + 1);
        parent.find('.services__item__img').removeClass('_active');
        parent.find('.services__item__img[data-slide="' + slideNumber + '"]').addClass('_active');
        sliderImgsUpdate(slideNumber, $(this).closest('.services__item'));
    });

    $('.services__item__btns-prev').click(function() {
        var parent = $(this).closest('.services__item');
        var lineItems = parent.find('.services__item__line');
        var currentSlide = Number(parent.find('.services__item__line._active').attr('data-slide-number'))
        var slideNumber = Number(parent
                            .find('.services__item__line._active')
                            .removeClass('_active')
                            .prev()
                            .addClass('_active')
                            .attr('data-slide-number'));

        if (currentSlide === 0) {
            parent.find('.services__item__line._active').removeClass('_active');
            slideNumber = Number(parent
                            .find('.services__item__line:last-child')
                            .addClass('_active')
                            .attr('data-slide-number'));
        }

        parent.find('.services__item__numbers-current span').text(slideNumber + 1);
        parent.find('.services__item__img').removeClass('_active');
        parent.find('.services__item__img[data-slide="' + slideNumber + '"]').addClass('_active');
        sliderImgsUpdate(slideNumber, $(this).closest('.services__item'));
    });

});