/*global config*/
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'uglify-save-license', 'del', 'wiredep']
});
var gulpsync = require('gulp-sync')(gulp);


/** ======================================== build ======================================== **/

gulp.task('env:develop', function () {
    $.env({
        vars: {
            NODE_ENV: 'dev'
        }
    });
});

gulp.task('env:prod', function () {
    $.env({
        vars: {
            NODE_ENV: 'prod'
        }
    });
});
gulp.task('build:develop', ['env:develop', 'build']);

gulp.task('build:ci', gulpsync.sync(['test', 'build:dist']));

gulp.task('build:dist', ['env:prod', 'build']);

gulp.task('build', ['indexHtml', 'styles', 'img', 'fonts', 'i18n', 'html']);

gulp.task('clean', function (done) {
    return $.del(config.outputs(), done);
});
