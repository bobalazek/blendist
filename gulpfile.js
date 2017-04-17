const gulp = require('gulp');
const childProcess = require('child_process');
const electron = require('electron');

/***** Default *****/
gulp.task('default', ['start']);

/***** Start *****/
gulp.task('start', ['watch'], () => {
    childProcess
        .spawn(electron, ['.'], { stdio: 'inherit' })
        .on('close', () => {
            process.exit();
        });
});

// Includes
require('./tasks/watch')(electron);
require('./tasks/csfix');
require('./tasks/build');
