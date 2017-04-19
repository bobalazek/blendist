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
        // The main app
        main_paths: [
            'src/**/*.js',
            '!src/web/**/*.js',
            'src/**/*.twig',
        ],
        // The web app
        web_paths: [
            'src/web/**/*.js',
            'src/web/**/*.css',
            'src/web/**/*.html',
        ],
    },
    // Package
    package: {
        src: 'dist',
        dest: 'build/' + config.env,
    },
    // Dist
    dist: {
        src: [
            'src/**/*'
        ],
        dest: 'dist',
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
require('./tasks/dist')(options);
require('./tasks/build')(options);
