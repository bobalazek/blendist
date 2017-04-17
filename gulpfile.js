const gulp = require('gulp');
const electron = require('electron-connect').server.create();

/***** Default *****/
gulp.task('default', ['start']);

/***** Start *****/
gulp.task('start', ['watch'], () => {
    electron.start();
});

// Includes
require('./tasks/watch')(electron);
require('./tasks/csfix');
require('./tasks/build');
