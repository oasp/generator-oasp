/*global config, isBuildForProd, $*/
'use strict';
var gulp = require('gulp');

gulp.task('fonts', function (done) {
    //TODO check font awesome
    if (isBuildForProd()) {
        return gulp.src('bower_components/**/*.{eot,svg,ttf,woff,woff2}')
            .pipe($.flatten())
            .pipe(gulp.dest(config.output() + '/fonts/'));
    } else {
        done();
    }
});
