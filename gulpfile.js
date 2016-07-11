var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('scripts', function() {
  return gulp.src(['./public/js/controllers/*.js', './public/js/services/*.js', './public/*.js'])
  .pipe(concat('all.js'))
  .pipe(gulp.dest('./dist/'))
})

gulp.task('styles', function(){
  return gulp.src('./public/styles/*.css')
  .pipe(concat('all.css'))
  .pipe(gulp.dest('./dist/'))
})

gulp.task('compress', function(){
  pump([
    gulp.src('./dist/all.js'),
    uglify(),
    gulp.dest('./dist/min')
  ])
})

gulp.task('default', function() {
  // place code for your default task here
});
