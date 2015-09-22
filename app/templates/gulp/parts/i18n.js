/*global config, isBuildForProd*/
'use strict';
var gulp = require('gulp');

gulp.task('i18n', function (done) {
    if (isBuildForProd()) {
        return gulp.src(config.i18n.src(), {base: config.paths.src})
            .pipe(gulp.dest(config.output()));
    } else {
        done();
    }
});
