var paths = require('path');
var glob = require('glob');
var ngParseModule = require('ng-parse-module');
var _ = require('underscore');
_.str = require('underscore.string');

if (!String.prototype.format) {
    String.prototype.format = function () {
        'use strict';

        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

module.exports = {
    isCalledFromRoot: function (rootPath, currentPath) {
        return rootPath === currentPath;
    },
    nameBuilder: {
        ngModuleName: function () {
            return _.map(arguments, function (element) {
                    return _.str.camelize(element);
                }
            ).join('.');
        },
        trainModuleName: function (module) {
            return _.str.dasherize(_.str.underscored(module));
        }
    },
    moduleFinder: {
        findClosestModule: function (rootPath, currentPath) {
            var modules;
            while (currentPath !== rootPath) {
                modules = glob.sync('*.module.js', {cwd: currentPath, realpath: true});
                if (modules.length > 0) {
                    return {
                        modulePath: modules[0],
                        relativeDirPath: paths.relative(rootPath, currentPath),
                        fileName: paths.basename(modules[0]),
                        parsedModule: ngParseModule.parse(modules[0])
                    };
                }
                currentPath = paths.dirname(currentPath);
            }
            return null;
        },
        findAppModule: function (appPath, appDir) {
            var modules, currentPath = paths.join(appPath, appDir);
            modules = glob.sync('*.module.js', {cwd: currentPath, realpath: true});
            if (modules.length > 0) {
                return {
                    modulePath: modules[0],
                    relativeDirPath: paths.relative(appPath, currentPath),
                    fileName: paths.basename(modules[0]),
                    parsedModule: ngParseModule.parse(modules[0])
                };
            } else {
                return null;
            }
        }
    }
};
