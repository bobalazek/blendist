const gulp = require('gulp');
const builder = require('electron-builder');

module.exports = (options) => {
    gulp.task('build', () => {
        builder.build()
            .then(() => {
                console.log('Successfully build the app.');
            })
            .catch((err) => {
                console.log('Something went wrong. ' + err);
            });
    });
};
