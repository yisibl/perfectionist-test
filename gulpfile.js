var gulp          = require('gulp')
var cssfmt        = require('cssfmt')
var postcss       = require('gulp-postcss')
var prettify      = require('gulp-jsbeautifier')
var perfectionist = require('perfectionist')
var autoprefixer  = require('autoprefixer-core')

var perfectionistOptions = {
  maxValueLength: 90
}

var browserOptions = ["> 0%"]

gulp.task('test', function() {
  return gulp.src('input/source-map.scss')
    .pipe(postcss([
      autoprefixer({
        browsers: browserOptions
      }),
      perfectionist(perfectionistOptions)
    ]))
    .pipe(gulp.dest('test/'))
})

gulp.task('perfectionist', function() {
  return gulp.src('input/*.css')
    .pipe(postcss([
      perfectionist(perfectionistOptions)
    ]))
    .pipe(gulp.dest('perfectionist/'))
})

gulp.task('cssfmt', function() {
  return gulp.src('input/*.css')
    .pipe(postcss([
      cssfmt()
    ]))
    .pipe(gulp.dest('cssfmt/'))
})

gulp.task('prettify', function() {
  return gulp.src('input/*.css')
    .pipe(prettify({
      indent_size: 2,
      selector_separator_newline: false,
      // newline_between_rules: false
    }))
    .pipe(gulp.dest('prettify/'))
})

gulp.watch('input/*.css', ['perfectionist', 'cssfmt', 'prettify'])
gulp.task('default', ['perfectionist', 'cssfmt', 'prettify'])
