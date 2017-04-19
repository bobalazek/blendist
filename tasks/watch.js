const gulp = require('gulp');
const args = require('./../src/core/args')();
// TODO: Implement browser reload with web_paths

module.exports = (options, electron) => {
    gulp.task('watch', () => {
        gulp.watch(
            options.watch.main_paths,
            () => {
                electron.restart(args);
            }
        );
    });
};
