module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./dev/pug/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./dev/static/sass/**/*.sass', $.gulp.series('sass'));
        $.gulp.watch('./dev/static/img/svg/*.svg', $.gulp.series(['svg', 'sass']));
        $.gulp.watch('./dev/static/js/**/*.js', $.gulp.series('libsJS:dev', 'js:copy'));
        $.gulp.watch(['./dev/static/img/**/*', '!./dev/static/img/svg/**/*'], $.gulp.series('img:dev'));
    });
};