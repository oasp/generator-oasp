/*global config, isBuildForProd, $*/
'use strict';
var gulp = require('gulp');

gulp.task('html', function () {
    return gulp.src(config.html.src(), {base: config.paths.src})
        .pipe($.newer(config.paths.tmp))
        .pipe($.processhtml({
            commentMarker: 'process',
            recursive: true,
            includeBase: config.paths.src
        }))
        .pipe($.if(isBuildForProd(), $.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        })))
        .pipe(gulp.dest(config.output()))
        .pipe($.size());
});
