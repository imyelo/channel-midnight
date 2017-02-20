var gulp = require('gulp');

gulp.task('copy', function () {
  return gulp.src([
      './application/vendors/**/*'
    ], {
      base: './application'
    })
    .pipe(gulp.dest('../../build/static/'));
});
