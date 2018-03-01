const gulp = require('gulp')
const del = require('del')

gulp.task('clean', function (cb) {
  return del(['../../dist/static'], {force: true}, cb)
})
