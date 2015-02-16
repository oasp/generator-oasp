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
  expandModule: function (module) {
    'use strict';
    var modules;
    if (module && module.indexOf('/') >= 0) {
      modules = module.split('/');
      return {
        module: modules[0],
        submodule: modules[1]
      };
    } else {
      return {
        module: module
      };
    }
  },
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
      } else {
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
    moduleName: function (config, module) {
      'use strict';
      var moduleName;
      if (module.submodule) {
        moduleName = '{0}.{1}'.format(module.module, module.submodule);
      } else {
        moduleName = '{0}.{1}'.format(config.appModule, module.module);
      }
      return _.str.camelize(moduleName);
    }
  }
};
