var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    minifycss = require('gulp-clean-css');

gulp.task('sass', function() {
  return gulp.src([
    './scss/**/*.scss'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss({
      debug: true
    }, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest('./css'));
});

gulp.watch('./sass/**/*', ['sass']);
gulp.task('default', ['sass']);