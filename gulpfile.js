var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    minifycss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

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
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());;
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./scss/**/*', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);