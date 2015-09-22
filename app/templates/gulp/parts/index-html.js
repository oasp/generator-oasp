/*global config, isBuildForProd, gulpsync, $*/
'use strict';
var gulp = require('gulp');

gulp.task('indexHtml', gulpsync.sync([
    ['styles', 'img:sprite', 'ngTemplates'],
    'indexHtml:html'
]));

//only build index.html without dependencies
gulp.task('indexHtml:html', function () {
    return gulp.src(config.indexHtml.src())
        //TODO fix it
        .pipe($.wiredep.stream({
            directory: 'bower_components',
            exclude: ['bootstrap.js']
        }))
        .pipe($.inject(gulp.src(config.scripts.src(), {read: false}), {
            addRootSlash: false,
            ignorePath: [config.paths.src, config.paths.tmp]
        }))
        .pipe($.inject(gulp.src(config.styles.injects(), {read: false}), {
            addRootSlash: false,
            ignorePath: [config.paths.src, config.paths.tmp, config.paths.dist]
        }))
        .pipe($.processhtml({
            commentMarker: 'process',
            recursive: true,
            includeBase: config.paths.src
        }))
        .pipe($.if(isBuildForProd(), $.usemin({
            path: '{' + config.paths.tmp + ',' + config.paths.src + '}',
            css: [$.minifyCss(), 'concat', $.rev()],
            jsModernizr: [$.ngAnnotate(), $.uglify({preserveComments: $.uglifySaveLicense}), $.rev()],
            jsVendor: [$.ngAnnotate(), $.uglify({preserveComments: $.uglifySaveLicense}), $.rev()],
            jsApp: [$.ngAnnotate(), $.uglify({preserveComments: $.uglifySaveLicense}), $.rev()]
        })))
        .pipe(gulp.dest(config.output()))
        .pipe($.size());
});
