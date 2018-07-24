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

    $('.main-slider__item__title').each(function () {
        var numbColor = $(this).attr('data-color');

        $(this).css({
            'color': numbColor
        });
    });

});