$(document).ready(function () {

    var $body = $('body');
    var $overlay = $('.overlay');
    var $menu = $('.menu');

    $('.menu__btn').click(function () {
        if ($menu.hasClass('_open')) {
            $menu.removeClass('_open');
            $body.removeClass('_open-menu');
            $overlay.removeClass('_show');
        } else {
            $menu.addClass('_open');
            $body.addClass('_open-menu');
            $overlay.addClass('_show');
        }
    });

    $overlay.click(function () {
        $overlay.removeClass('_show');
        $menu.removeClass('_open');
        $body.removeClass('_open-menu');
    });

});