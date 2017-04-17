const gulp = require('gulp');

module.exports = function(electron) {
    gulp.task('watch', () => {
        gulp.watch([
            'src/**/*.js',
        ], electron.relaunch);
    });
};
