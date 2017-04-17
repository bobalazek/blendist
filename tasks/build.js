const gulp = require('gulp');
const fs = require('fs');
const packager = require('electron-packager');
const config = require('./../src/core/config');

gulp.task('build', () => {
    return packager({
        dir: 'src',
        out: 'build/' + config.env,
        overwrite: true,
        afterCopy: [
            (buildPath, electronVersion, platform, arch, callback) => {
                const configDistPath = buildPath + '/config/config.dist.json';
                const configDevPath = buildPath + '/config/config_dev.json';
                
                // Remove dev config
                if (fs.existsSync(configDevPath)) {
                    fs.unlinkSync(configDevPath);
                }

                // Build the config
                fs.writeFileSync(
                    configDistPath,
                    JSON.stringify(config)
                );

                callback();
            },
        ],
    }, (err, appPaths) => {
        if (err) {
            console.log('Whops. Something went wrong. Error: ' + err);
            return false;
        }

        console.log('Building completed. Output paths:');
        console.log(appPaths);
    });
});
