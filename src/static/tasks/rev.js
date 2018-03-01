const gulp = require('gulp')
const rev = require('gulp-rev')
const replace = require('gulp-rev-replace')
const cdnizer = require('gulp-cdnizer')
const del = require('del')
const vinylPaths = require('vinyl-paths')
const config = require('config')

gulp.task('rev', function () {
  return gulp.src('../../dist/static/apps/entry/*.js', {
      base: '../../dist',
    })
    .pipe(rev())
    .pipe(gulp.dest('../../dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('../../dist'))
})

gulp.task('rev-replace', function () {
  return gulp.src('./application/templates/**/*.ejs')
    .pipe(cdnizer({
      defaultCDNBase: config.get('resource.cdn.static.domain') + config.get('resource.cdn.static.path'),
      allowRev: true,
      allMin: true,
      files: ['**/*.js', '**/*.css', '**/*.gif', '**/*.jpg', '**/*.png']
    }))
    .pipe(replace({
      manifest: gulp.src('../../dist/rev-manifest.json'),
      replaceInExtensions: ['.ejs']
    }))
    .pipe(gulp.dest('../../dist/static/templates'))
})
