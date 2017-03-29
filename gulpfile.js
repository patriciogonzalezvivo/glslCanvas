'use strict';

var gulp = require('gulp');
var derequire = require('gulp-derequire');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');

var paths = {
    scripts: 'src/**/*.js'
};

// Build Javascripts
gulp.task('js', function () {
    var browserify = require('browserify');
    var shim = require('browserify-shim');
    var babelify = require('babelify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');

    var bundle = browserify({
        entries: 'src/GlslCanvas.js',
        standalone: 'GlslCanvas',
        debug: true,
        transform: [
            babelify.configure({ optional: ['runtime'] }),
            shim
        ]
    });

    return bundle.bundle()
        .pipe(plumber())
        .pipe(source('GlslCanvas.js'))
        .pipe(derequire())
        .pipe(buffer())
        .pipe(gulp.dest('./build'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(paths.scripts, ['js']);
});

// Build files, do not watch
gulp.task('build', ['js']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['js', 'watch']);
