const gulp = require('gulp')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')

gulp.task('uglify', function () {
  return gulp.src('../../dist/static/**/*.js', {
      base: '../../dist/',
    })
    .pipe(uglify())
    .pipe(gulp.dest('../../dist'))
})

gulp.task('htmlmin', function () {
  return gulp.src('../../dist/static/**/*.ejs', {
      base: '../../dist/',
    })
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../../dist/'))
})

gulp.task('minify', ['uglify', 'htmlmin'])
