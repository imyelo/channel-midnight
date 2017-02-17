const gulp = require('gulp')
const del = require('del')

gulp.task('clean', function (cb) {
  return del(['../../build'], {force: true}, cb)
})
