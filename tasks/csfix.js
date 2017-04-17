const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('csfix', () => {
    return gulp.src([
        'src/**/*.js',
    ])
        .pipe(eslint({
            fix: true,
        }))
        .pipe(eslint.format())
        .pipe(gulp.dest('src'));
});
