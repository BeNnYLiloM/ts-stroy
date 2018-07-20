module.exports = function() {
    $.gulp.task('svg', () => {
        return $.gulp.src('./dev/static/img/svg/*.svg')
            .pipe($.gp.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe($.gp.cheerio({
                run: function($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe($.gp.replace('&gt;', '>'))
            .pipe($.gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "sprite.svg",
                        render: {
                            scss: {
                                dest:'../../../../../dev/static/sass/_sprite.scss',
                                template: "dev/static/sass/templates/_sprite_template.scss"
                            }
                        },
                        example: true
                    }
                }
            }))
            .pipe($.gulp.dest('./build/static/img/svg/'));
    });
};
