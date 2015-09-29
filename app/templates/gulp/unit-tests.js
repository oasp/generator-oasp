/*global config*/
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var createKarmaTask = function (options) {
    /**
     * Pass empty array - karma will query for files.
     */
    return gulp.src('dummy.dummy')
        .pipe($.karma(options))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
};
gulp.task('test', ['lint', 'ngTemplates'], function () {
    process.env.generateCoverage = true;
    return createKarmaTask({
        configFile: 'karma.conf.js',
        action: 'run'
    });
});
gulp.task('test:tdd', ['ngTemplates'], function () {
    process.env.generateCoverage = false;
    return createKarmaTask({
        configFile: 'karma.conf.js',
        action: 'watch'
    });
});
gulp.task('test:tdd:debug', ['ngTemplates'], function () {
    process.env.generateCoverage = false;
    return createKarmaTask({
        configFile: 'karma.conf.js',
        action: 'watch',
        browsers: [
            'Chrome'
        ]
    });
});
gulp.task('lint', function () {
    return gulp.src(config.scripts.lintSrc())
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError());
});