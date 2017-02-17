const gulp = require('gulp')
const sequence = require('run-sequence')

require('./task/clean')
require('./task/copy')
require('./task/webpack')
require('./task/rev')
require('./task/minify')

gulp.task('dev', function () {
  return sequence('clean', 'webpack-dev')
})

gulp.task('build', function () {
  return sequence('clean', 'copy', 'webpack', 'rev', 'rev-replace', 'minify')
})

gulp.task('default', ['dev'])
