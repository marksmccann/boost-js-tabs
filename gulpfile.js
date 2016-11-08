var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var minify = require('gulp-minify');

gulp.task('demo', function() {
    return browserify('demo/main.js')
        .bundle()
        .pipe(source('demo.js'))
        .pipe(gulp.dest('demo'));
});

gulp.task('dist', function() {
    gulp.src('src/tabs.js')
      .pipe(minify({ext:{min:'.min.js'}}))
      .pipe(gulp.dest('dist'))
});

gulp.task('default',function() {
    gulp.watch('src/tabs.js',['dist']);
    gulp.watch('demo/main.js',['demo']);
});
