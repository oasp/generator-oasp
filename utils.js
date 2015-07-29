var paths = require('path');
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
    // TODO: remove
    expandModule: function (module) {
        'use strict';
        var modules;
        if (module && module.indexOf('/') >= 0) {
            modules = module.split('/');
            return {
                module: modules[0],
                submodule: modules[1]
            };
        }
        else {
            return {
                module: module
            };
        }
    },
    // TODO: remove
    pathBuilder: {
        buildPath: function (path, config, module, item) {
            'use strict';
            var result = path;
            result = _.str.replaceAll(result, '{app}', config.appPath);
            result = _.str.replaceAll(result, '{item}', item);
            if (module.submodule) {
                result = _.str.replaceAll(result, '{module}', module.module + '/' + module.submodule);
                result = _.str.replaceAll(result, '{mainmodule}', module.module);
                result = _.str.replaceAll(result, '{submodule}', module.submodule);
            }
            else {
                result = _.str.replaceAll(result, '{module}', module.module);
                result = _.str.replaceAll(result, '{mainmodule}', module.module);
                result = _.str.replaceAll(result, '{submodule}', module.module);
            }
            return result;
        }
    },
    angularNamesBuilder: {
        controllerName: function (controller) {
            'use strict';
            return _.str.camelize(controller) + 'Cntl';
        },
        directiveName: function (controller) {
            'use strict';
            return _.str.camelize(controller);
        },
        // TODO: rename this method after moduleName is not used and deleted
        moduleName2: function (module) {
            return _.str.camelize(module);
        },
        // TODO: remove
        moduleName: function (config, module) {
            'use strict';
            var moduleName;
            if (module.submodule) {
                moduleName = '{0}.{1}'.format(module.module, module.submodule);
            }
            else {
                moduleName = '{0}.{1}'.format(config.appModule, module.module);
            }
            return _.str.camelize(moduleName);
        }
    },
    resolveParentModuleAndDestinationDirectoryPath: function (generator) {
        var resolveModuleFilePath = function (currentPath) {
            return paths.join(currentPath, paths.basename(currentPath)) + '.module.js';
        };

        var destinationPath = generator.env.cwd,
            currentPath = destinationPath,
            moduleFilePath = resolveModuleFilePath(currentPath),
            rootPath = generator.destinationPath();

        if (currentPath === rootPath || currentPath === rootPath) {
            var mainModulePath = generator.config.getAll().appModulePath;

            if (generator.fs.exists(mainModulePath)) {
                generator.log(mainModulePath);
                return {
                    moduleFilePath: mainModulePath,
                    destinationDirectory: paths.dirname(mainModulePath)
                };
            }
        }

        while (currentPath !== rootPath) {
            if (generator.fs.exists(moduleFilePath)) {
                return {
                    moduleFilePath: moduleFilePath,
                    destinationDirectory: destinationPath
                };
            }
            currentPath = paths.dirname(currentPath);
            moduleFilePath = resolveModuleFilePath(currentPath);
        }
        return null;
    }
};
