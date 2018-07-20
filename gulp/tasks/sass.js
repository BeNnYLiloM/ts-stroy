module.exports = function () {
    $.gulp.task('sass', function () {
        return $.gulp.src('./dev/static/sass/styles.sass')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sass().on('error', $.gp.sass.logError))
            .pipe($.gp.rename({suffix: '.min', prefix: ''}))
            .pipe($.gp.autoprefixer(['last 15 versions']))
            .pipe($.gp.cleanCss())
            .pipe($.gulp.dest('./build/static/css/'))
            .pipe($.browserSync.reload({stream: true}));
    });
};