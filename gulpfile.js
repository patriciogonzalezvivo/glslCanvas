'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');


// Build Javascripts
gulp.task('js', function () {
    var browserify = require('browserify');
    var babelify = require('babelify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var uglify = require('gulp-uglify');

    var bundle = browserify({
        entries: 'src/GlslCanvas.js',
        debug: true,
        transform: [babelify]
    });

    return bundle.bundle()
        .pipe(source('GlslCanvas.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(concat('GlslCanvas.min.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        // //     Add transformation tasks to the pipeline here.
            // .pipe(uglify())
            // .on('error', gutil.log)
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/*.js', ['js']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['js', 'watch']);