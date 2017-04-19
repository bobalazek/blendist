const gulp = require('gulp');
const electron = require('electron-connect').server.create({
    port: 11223,
});
const args = require('./src/core/args')();
const config = require('./src/core/config');

const options = {
    // CSFix
    csfix: {
        src: [
            'src/**/*.js',
        ],
        eslint_opts: {
            fix: true,
        },
        dest: 'src',
    },
    // Watch
    watch: {
        paths: [
            'src/**/*.js',
            'src/**/*.css',
            'src/**/*.html',
            'src/**/*.twig',
        ],
    },
    // Package
    package: {
        src: 'src',
        dest: 'build/' + config.env,
    },
};

/***** Default *****/
gulp.task('default', ['start']);

/***** Start *****/
gulp.task('start', ['watch'], () => {
    electron.start(args);
});

// Includes
require('./tasks/watch')(options, electron);
require('./tasks/csfix')(options);
require('./tasks/package')(options);
require('./tasks/build')(options);
