const gulp = require('gulp');

module.exports = function(electron) {
    gulp.task('watch', () => {
        gulp.watch([
            'src/**/*.js',
        ], electron.restart);

        gulp.watch([
            'src/**/*.css',
            'src/**/*.html',
        ], electron.reload);
    });
};
