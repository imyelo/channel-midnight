var gulp = require('gulp');

gulp.task('copy', function () {
  return gulp.src([
      './application/vendor/**/*'
    ], {
      base: './application'
    })
    .pipe(gulp.dest('../../build/static/'));
});
