const gulp = require('gulp');
const electron = require('electron-connect').server.create({
    port: 11223,
});
const args = require('./src/core/args')();

/***** Default *****/
gulp.task('default', ['start']);

/***** Start *****/
gulp.task('start', ['watch'], () => {
    electron.start(args);
});

// Includes
require('./tasks/watch')(electron);
require('./tasks/csfix');
require('./tasks/build');
