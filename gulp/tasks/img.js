module.exports = function() {
    $.gulp.task('img:dev', () => {
        return $.gulp.src(['./dev/static/img/**/*', '!./dev/static/img/svg/**/*'])
            .pipe($.gulp.dest('./build/static/img/'));
    });

    $.gulp.task('img:build', () => {
        return $.gulp.src(['./dev/static/img/**/*', '!./dev/static/img/svg/**/*'])
            // .pipe($.gp.tinypng(YOUR_API_KEY))
            .pipe($.gulp.dest('./build/static/img/'));
    });
};
