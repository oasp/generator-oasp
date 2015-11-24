'use strict';

var gulp = require('gulp');
var fs = require('fs');

global.bowerConfig = JSON.parse(fs.readFileSync('./.bowerrc', 'utf8'));

global.isBuildForProd = function () {
    return process.env.NODE_ENV === 'prod';
};

global.config = require('./gulp/lib/config-factory.js')(require('./config.json'));

global.$ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'uglify-save-license', 'del', 'wiredep']
});

global.gulpsync = require('gulp-sync')(gulp);

require('require-dir')('./gulp', {recurse: false});

require('require-dir')('./gulp/parts', {recurse: false});

gulp.task('default', ['clean'], function () {
    gulp.start('build:dist');
});
