const gulp = require('gulp');
const args = require('./_args');

module.exports = (electron) => {
    gulp.task('watch', () => {
        gulp.watch([
            'src/**/*.js',
            'src/**/*.css',
            'src/**/*.html',
            'src/**/*.twig',
        ], () => {
            electron.restart(args);
        });
    });
};
