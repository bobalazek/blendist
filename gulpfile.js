const gulp = require('gulp');

/***** Default *****/
gulp.task('default', ['start']);

/***** Start *****/
gulp.task('start', ['watch'], () => {
    console.log('Starting the app ...');
});

// Includes
require('./tasks/watch');
require('./tasks/csfix');
require('./tasks/build');
