/*global config*/
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var Server = require('karma').Server;

gulp.task('test', ['lint', 'ngTemplates'], function (done) {
    process.env.generateCoverage = true;
    new Server({
        configFile: __dirname + '/../karma.conf.js',
        singleRun: true,
        autoWatch: false
    }, done).start();
});
gulp.task('test:tdd', ['ngTemplates'], function (done) {
    process.env.generateCoverage = false;
    new Server({
        configFile: __dirname + '/../karma.conf.js',
        singleRun: false,
        autoWatch: true
    }, done).start();
});
gulp.task('test:tdd:debug', ['ngTemplates'], function (done) {
    process.env.generateCoverage = false;
    new Server({
        configFile: __dirname + '/../karma.conf.js',
        singleRun: false,
        autoWatch: true,
        browsers: [
            'Chrome'
        ]
    }, done).start();
});
gulp.task('lint', function () {
    return gulp.src(config.scripts.lintSrc())
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError());
});
