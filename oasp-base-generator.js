var paths = require('path');
var glob = require('glob');
var ngParseModule = require('ng-parse-module');
var yeoman = require('yeoman-generator');
var _ = require('underscore');
_.str = require('underscore.string');
var fs = require('fs-extra');

if (!String.prototype.format) {
    String.prototype.format = function () {
        'use strict';

        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}
module.exports = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        var that = this;
        this.hasBeenCalledFromRoot = function (rootPath, currentPath) {
            return rootPath === currentPath;
        };

        this.pathBuilder = {
            calculateTestBasePath: function (path, appPath, testPath) {
                return path.replace(appPath, testPath);
            }
        };

        this.nameBuilder = {
            ngModuleName: function () {
                return _.map(arguments, function (element) {
                        return _.str.camelize(element);
                    }
                ).join('.');
            },
            ngDirectiveName: function (directive) {
                return _.str.camelize(directive);
            },
            ngControllerName: function (controller) {
                return _.str(_.str.camelize(controller + 'Cntl')).capitalize().value();
            },
            trainItemName: function (item) {
                return _.str.dasherize(_.str.underscored(item));
            },
            fileNgControllerName: function (module) {
                return _.str.dasherize(_.str.underscored(module)) + '.controller.js';
            },
            fileNgModuleName: function (module) {
                return _.str.dasherize(_.str.underscored(module)) + '.module.js';
            }
        };

        this.moduleFinder = {
            findClosestModule: function (rootPath, currentPath) {
                var modules;
                while (currentPath !== rootPath) {
                    modules = glob.sync('*.module.js', {cwd: currentPath, realpath: true});
                    if (modules.length > 0) {
                        return {
                            modulePath: modules[0],
                            moduleDir: paths.dirname(modules[0]),
                            relativeDirPath: paths.relative(rootPath, currentPath),
                            fileName: paths.basename(modules[0]),
                            parsedModule: ngParseModule.parse(modules[0])
                        };
                    }
                    currentPath = paths.dirname(currentPath);
                }
                return null;
            },
            findModuleByName: function (appPath, appDir, moduleName) {
                var modules, currentPath = paths.join(appPath, appDir, that.nameBuilder.trainItemName(moduleName));
                modules = glob.sync('*.module.js', {cwd: currentPath, realpath: true});
                if (modules.length > 0) {
                    return {
                        modulePath: modules[0],
                        moduleDir: paths.dirname(modules[0]),
                        relativeDirPath: paths.relative(appPath, currentPath),
                        fileName: paths.basename(modules[0]),
                        parsedModule: ngParseModule.parse(modules[0])
                    };
                } else {
                    return null;
                }
            },
            findAppModule: function (appPath, appDir) {
                var modules, currentPath = paths.join(appPath, appDir);
                modules = glob.sync('*.module.js', {cwd: currentPath, realpath: true});
                if (modules.length > 0) {
                    return {
                        modulePath: modules[0],
                        moduleDir: paths.dirname(modules[0]),
                        relativeDirPath: paths.relative(appPath, currentPath),
                        fileName: paths.basename(modules[0]),
                        parsedModule: ngParseModule.parse(modules[0])
                    };
                } else {
                    return null;
                }
            }
        };


        //////////////////////////////////////////////////////////////////////////////////
        this.paths = fs.readJsonSync(this.destinationPath('config.json')).paths;
        this.isCalledFromRoot = this.hasBeenCalledFromRoot(this.destinationPath(), this.env.cwd);

        //calculate target module
        if (this.isCalledFromRoot) {
            this.targetParentModule = this.moduleFinder.findAppModule(this.destinationPath(), this.paths.src);
        } else {
            this.targetParentModule = this.moduleFinder.findClosestModule(this.destinationPath(), this.env.cwd);
        }
    }
});
