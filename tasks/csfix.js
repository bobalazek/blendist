const gulp = require('gulp');
const eslint = require('gulp-eslint');

module.exports = (options) => {
    gulp.task('csfix', () => {
        return gulp.src(options.csfix.src)
            .pipe(eslint(options.csfix.eslint_opts))
            .pipe(eslint.format())
            .pipe(gulp.dest(options.csfix.dest));
    });
};
