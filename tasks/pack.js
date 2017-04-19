const gulp = require('gulp');
const glob = require('glob');
const fs = require('fs');
const config = require('./../app/core/config');

module.exports = (options) => {
    gulp.task('pack', () => {
        return gulp.src(options.pack.src)
            .on('end', () => {
                const configDistPath = options.pack.dest + '/config/config.dist.json';
                const configFiles = glob.sync(
                    options.pack.dest + '/config/*.json'
                );

                // Clean the unused config files.
                // At the end, we only need the merged config.dist.json file.
                for (let i = 0; i < configFiles.length; i++) {
                    fs.unlinkSync(configFiles[i]);
                }

                // Prepare the dist config file.
                fs.writeFileSync(
                    configDistPath,
                    JSON.stringify(config)
                );
            })
            .pipe(gulp.dest(options.pack.dest));
    });
};
