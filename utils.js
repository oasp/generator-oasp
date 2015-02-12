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
    forModuleFile: function (config, module) {
      'use strict';
      var path;
      if (module.submodule) {
        path = '{0}/{1}/{2}/{2}.module.js'.format(config.appPath, module.module, module.submodule);
      } else {
        path = '{0}/{1}/{1}.module.js'.format(config.appPath, module.module);
      }
      return path;
    },
    forLessPath: function (config, module) {
      'use strict';
      var path;
      if (module.submodule) {
        path = '{0}/{1}/{2}/css/{2}.less'.format(config.appPath, module.module, module.submodule);
      } else {
        path = '{0}/{1}/css/{1}.less'.format(config.appPath, module.module);
      }
      return path;
    }
  },
  angularNamesBuilder: {
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
