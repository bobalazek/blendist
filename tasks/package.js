const gulp = require('gulp');
const packager = require('electron-packager');

module.exports = (options) => {
    gulp.task('package', ['dist'], () => {
        return packager({
            dir: options.package.src,
            out: options.package.dest,
            overwrite: true,
        }, (err, appPaths) => {
            if (err) {
                console.log('Whops. Something went wrong. Error: ' + err);
                return false;
            }

            console.log('Building completed. Output paths:');
            console.log(appPaths);
        });
    });
};
