var gulp  = require('gulp'),
  connect = require('gulp-connect'),
  concat  = require('gulp-concat'),
  babel   = require('gulp-babel');

gulp.task('connect', function() {
  connect.server({
    root: ['public'],
    livereload: true
  });
});

gulp.task('build', function () {
  gulp.src('./app/*.js')
    .pipe(babel())
    .pipe(concat('deezer-app.js'))
    .pipe(gulp.dest('public'))
    .pipe(gulp.dest('tests'))
    .pipe(connect.reload());
});

gulp.task('connectTest', function() {
  connect.server({
    root: ['tests'],
    port: 8081,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.js', './tests/**/*.js', './app/index.html'], ['build']);
});

gulp.task('default', ['connect', 'build', 'watch']);
gulp.task('test', ['connectTest', 'build', 'watch']);
