var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

gulp.task('demo', function() {
    return browserify('demo/main.js')
        .bundle()
        .pipe(source('demo.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('demo'));
});

gulp.task('dist', function() {
    gulp.src('src/tabs.js')
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist'))
});

gulp.task('default',function() {
    gulp.watch('src/tabs.js',['dist','demo']);
    gulp.watch('demo/main.js',['demo']);
});
