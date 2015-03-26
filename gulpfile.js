var gulp  = require('gulp'),
  connect = require('gulp-connect'),
  concat  = require('gulp-concat');

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('build', function () {
  gulp.src('./app/*.js')
    .pipe(concat('deezer-app.js'))
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.js', './app/index.html'], ['build']);
});

gulp.task('default', ['connect', 'build', 'watch']);
