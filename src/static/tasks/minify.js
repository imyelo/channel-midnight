const gulp = require('gulp')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')

gulp.task('uglify', function () {
  return gulp.src('../../build/static/**/*.js', {
      base: '../../build/',
    })
    .pipe(uglify())
    .pipe(gulp.dest('../../build'))
})

gulp.task('htmlmin', function () {
  return gulp.src('../../build/static/**/*.ejs', {
      base: '../../build/',
    })
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../../build/'))
})

gulp.task('minify', ['uglify', 'htmlmin'])
