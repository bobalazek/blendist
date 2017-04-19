const gulp = require('gulp');
const args = require('./../src/core/args')();

module.exports = (options, electron) => {
    gulp.task('watch', () => {
        gulp.watch(
            options.watch.paths,
            () => {
                electron.restart(args);
            }
        );
    });
};
