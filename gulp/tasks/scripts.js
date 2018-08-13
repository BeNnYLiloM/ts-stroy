module.exports = function() {
    let libs = [
        'dev/libs/jquery/dist/jquery.min.js',
        'dev/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'dev/libs/slick-carousel/slick/slick.min.js',
        'dev/libs/svg4everybody/dist/svg4everybody.min.js',
        'dev/libs/jQuery-viewport-checker/dist/jquery.viewportchecker.min.js',
        'dev/libs/jquery-animateNumber/jquery.animateNumber.min.js',
        'dev/libs/vanilla-lazyload/dist/lazyload.min.js',
        'dev/libs/microplugin/src/microplugin.js',
        'dev/libs/sifter/sifter.min.js',
        'dev/libs/selectize/dist/js/selectize.min.js',
        'dev/libs/jquery.maskedinput/dist/jquery.maskedinput.min.js',
        'dev/libs/ion.rangeSlider/js/ion.rangeSlider.min.js',
        'dev/libs/spritely-0.6.8/src/jquery.spritely.js',
    ];

    $.gulp.task('libsJS:dev', () => {
        return $.gulp.src(libs)
            .pipe($.gp.concat('libs.min.js'))
            .pipe($.gulp.dest('./build/static/js/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });

    $.gulp.task('libsJS:build', () => {
        return $.gulp.src(libs)
            .pipe($.gp.concat('libs.min.js'))
            .pipe($.gp.uglifyjs())
            .pipe($.gulp.dest('./build/static/js/'));
    });

    $.gulp.task('js:copy', () => {
        return $.gulp.src(['./dev/static/js/*.js',
                           '!./dev/static/js/libs.min.js'])
            .pipe($.gulp.dest('./build/static/js/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
