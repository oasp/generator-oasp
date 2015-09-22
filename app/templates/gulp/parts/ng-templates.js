/*global config, gulpsync, $*/
'use strict';
var gulp = require('gulp');

var ngTemplatesTasks = [];
gulp.task('ngTemplates', gulpsync.sync(['ngTemplatesTasksGeneration', 'ngTemplatesTasksExecution']));
gulp.task('ngTemplatesTasksExecution', ngTemplatesTasks);
gulp.task('ngTemplatesTasksGeneration', function () {
    config.ngTemplates.conf().forEach(function (ngTemplatesItemConf) {
        ngTemplatesTasks.push('ngTemplates[' + ngTemplatesItemConf.file + ']');
        gulp.task('ngTemplates[' + ngTemplatesItemConf.file + ']', function () {
            return gulp.src(ngTemplatesItemConf.src)
                .pipe($.processhtml({
                    commentMarker: 'process',
                    recursive: true,
                    includeBase: config.paths.src
                }))
                .pipe($.minifyHtml({
                    empty: true,
                    spare: true,
                    quotes: true
                }))
                .pipe($.ngTemplates({
                    module: ngTemplatesItemConf.module,
                    path: function (path, base) {
                        return path.replace(base, ngTemplatesItemConf.moduleDir + '/').replace('.tpl.html', '.html');
                    }
                }))
                .pipe($.concat(ngTemplatesItemConf.file))
                .pipe(gulp.dest(config.paths.tmp));
        });
    });
});

