const gulp = require('gulp');
const builder = require('electron-builder');
const Platform = builder.Platform;

module.exports = (options) => {
    gulp.task('build', () => {
        builder.build({
            targets: Platform.MAC.createTarget(),
        })
            .then(() => {
                console.log('Successfully build the app.');
            })
            .catch((err) => {
                console.log('Something went wrong. Error ' + err);
            });
    });
};
