const gulp = require('gulp');

gulp.task('watch', () => {
    gulp.watch([
        'src/**/*.js',
        'src/**/*.css',
        'src/**/*.html',
        'src/**/*.twig',
    ]).on('change', () => {
        // TODO: implement live-reload
    });
});
