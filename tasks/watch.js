const gulp = require('gulp');
const args = require('./../app/core/args')();

module.exports = (options, electron) => {
    gulp.task('watch', () => {
        // Main
        gulp.watch(
            options.watch.main_paths,
            () => {
                electron.restart(args);
            }
        );

        // Web
        gulp.watch(
            options.watch.web_paths,
            () => {
                // TODO
            }
        );
    });
};
