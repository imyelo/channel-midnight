const gulp = require('gulp')
const sequence = require('run-sequence')

require('./tasks/clean')
require('./tasks/copy')
require('./tasks/webpack')
require('./tasks/rev')
require('./tasks/minify')

gulp.task('dev', function () {
  return sequence('clean', 'copy', 'webpack-dev')
})

gulp.task('build', function () {
  return sequence('clean', 'copy', 'webpack', 'rev', 'rev-replace', 'minify')
})

gulp.task('default', ['dev'])
