var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core')
var perfectionist = require('perfectionist')
var cssfmt = require('cssfmt')

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

gulp.watch('input/*.css', ['default', 'cssfmt'])
