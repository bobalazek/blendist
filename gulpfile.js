const gulp = require('gulp');
const args = require('./app/core/args')();

const options = {
    // General
    electron: {
        port: 11223,
    },
    // CSFix
    csfix: {
        src: [
            'app/**/*.js',
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
            'app/**/*.js',
            '!app/web/**/*.js',
            'app/**/*.twig',
        ],
        // The web app
        web_paths: [
            'app/web/**/*.js',
            'app/web/**/*.css',
            'app/web/**/*.html',
        ],
    },
    // Pack
    pack: {
        src: [
            'app/**/*'
        ],
        dest: 'pack',
    },
};

const electron = require('electron-connect').server.create(options.electron);

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
