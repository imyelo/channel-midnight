const _ = require('lodash')
const gulp = require('gulp')
const webpack = require('webpack-stream')
const plumber = require('gulp-plumber')
const config = require('./webpack.config.js')

gulp.task('webpack-dev', function () {
  const pack = function () {
    const pack = webpack(_.defaultsDeep({
      watch: true,
      output: {
        chunkFilename: 'chunk/[name].js',
      }
    }, config()))
    pack.on('error', function (err) {
      console.log('[webpack error] %s', err)
    })
    return pack
  }

  return gulp.src('../package.json') // whatever sources
    .pipe(plumber())
    .pipe(pack())
    .pipe(gulp.dest('../../dist/static/apps'))
})

gulp.task('webpack', function () {
  return gulp.src('../package.json') // whatever sources
    .pipe(webpack(config({
      ENV: 'production'
    })))
    .pipe(gulp.dest('../../dist/static/apps'))
})
