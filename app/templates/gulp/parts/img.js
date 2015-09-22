/*global config, isBuildForProd, $*/
'use strict';
var gulp = require('gulp');


gulp.task('img', ['img:sprite', 'img:copy']);

gulp.task('img:sprite', function () {
    return gulp.src(config.img.sprite.src())
        .pipe($.spritesmith({
            imgName: config.img.sprite.output.img(),
            cssName: config.img.sprite.output.css()
        }))
        .pipe(gulp.dest(config.paths.tmp))
        .pipe($.size());
});

gulp.task('img:sprite:copy', ['img:sprite'], function (done) {
    if (isBuildForProd()) {
        return gulp.src(config.paths.tmp + '/' + config.img.sprite.output.img(), {base: config.paths.tmp})
            .pipe($.imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(config.output()))
            .pipe($.size());
    } else {
        done();
    }
});

gulp.task('img:copy', ['img:sprite:copy'], function (done) {
    if (isBuildForProd()) {
        return gulp.src(config.img.src(), {base: config.paths.src})
            .pipe($.imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(config.output()))
            .pipe($.size());
    } else {
        done();
    }
});

