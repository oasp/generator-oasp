/*global config, $*/
'use strict';
var gulp = require('gulp');

gulp.task('styles', function () {
    return gulp.src(config.styles.src())
        .pipe($.concat(config.styles.output()))
        .pipe($.less({
            paths: config.styles.includePaths()
        }))
        .pipe($.plumber())
        .pipe(gulp.dest(config.paths.tmp))
        .pipe($.size());
});

gulp.task('style:copy', function () {
    return gulp.src(config.styles.allSrc(), {base: config.paths.src})
        .pipe(gulp.dest(config.output()))
        .pipe($.size());
});
