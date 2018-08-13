module.exports = function () {
	$.gulp.task('pngSpriteWaveBig', function () {
		var spriteData = $.gulp.src('./dev/static/img/icons/wave-big/*.png').pipe($.gp.spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.css'
		}));

		return spriteData.pipe($.gulp.dest('./build/static/img/icons/wave-big-sprite/'));
	});

	$.gulp.task('pngSpriteWaveBtn', function () {
		var spriteData = $.gulp.src('./dev/static/img/icons/wave-btn/*.png').pipe($.gp.spritesmith({
			imgName: 'spriteWaveBtn.png',
			cssName: 'spriteWaveBtn.css'
		}));

		return spriteData.pipe($.gulp.dist('./build/static/img/icons/wave-btn-sprite/'));
	});
}