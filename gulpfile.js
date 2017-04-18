const gulp = require('gulp');
const electron = require('electron-connect').server.create();
const args = require('./tasks/_args');

/***** Default *****/
gulp.task('default', ['start']);

/***** Start *****/
gulp.task('start', ['watch'], () => {
    console.log('Starting the app ...');

    electron.start(args());
});

// Includes
require('./tasks/watch')(electron);
require('./tasks/csfix');
require('./tasks/build');
