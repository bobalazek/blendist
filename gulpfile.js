const gulp = require('gulp');
const args = require('./src/core/args')();
const config = require('./src/core/config');

const options = {
    // General
    electron: {
        port: 11223,
    },
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
    // Pack
    pack: {
        src: [
            'src/**/*'
        ],
        dest: 'pack',
    },
};

const electron = require('electron-connect').server.create(options.electron);
const browserSync = require('browser-sync').create();

/***** Default *****/
gulp.task('default', ['start']);

/***** Start *****/
gulp.task('start', ['watch'], () => {
    electron.start(args);
});

// Includes
require('./tasks/watch')(options, electron);
require('./tasks/csfix')(options);
require('./tasks/pack')(options);
require('./tasks/build')(options);
