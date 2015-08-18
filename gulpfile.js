var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core')
var perfectionist = require('perfectionist')
var cssfmt = require('cssfmt')
  //npm  install js-beautify
var prettify = require('gulp-jsbeautifier');

var perfectionistOptions = {
  maxValueLength: 90
}
var browserOptions = ["> 0%"]

gulp.task('default', function() {
  return gulp.src('input/*.css')
    .pipe(postcss([
      autoprefixer({
        browsers: browserOptions
      }),
      perfectionist(perfectionistOptions)
    ]))
    .pipe(gulp.dest('output/'))
})

gulp.task('perfectionist', function() {
  return gulp.src('input/source-map.scss')
    .pipe(postcss([
      perfectionist(perfectionistOptions)
    ]))
    .pipe(gulp.dest('output/'))
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
    .pipe(gulp.dest('prettify/'));
});

gulp.watch('input/*.css', ['default', 'cssfmt', 'prettify'])
