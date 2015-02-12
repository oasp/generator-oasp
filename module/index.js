'use strict';
var yeoman = require('yeoman-generator');
var oaspUtil = require('../utils.js');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('moduleName', {
      type: String,
      required: true,
      desc: 'Module name'
    });
    this.currentConfig = this.config.getAll();
    this.module = oaspUtil.expandModule(this.moduleName);
  },

  initializing: function () {
    this.log('-> Generating module ' + this.moduleName + '.');
  },
  writing: {
    saveModuleFile: function () {
      var modulePath = oaspUtil.pathBuilder.forModuleFile(this.currentConfig, this.module);
      if (!this.fs.exists(modulePath)) {
        this.fs.copyTpl(
          this.templatePath('module.js'),
          this.destinationPath(modulePath),
          {
            moduleName: oaspUtil.angularNamesBuilder.moduleName(this.currentConfig, this.module)
          }
        );
      } else {
        this.log(chalk.red('-> Module ' + this.moduleName + ' already exists!'));
      }
    },
    saveLessFile: function () {
      var lessPath = oaspUtil.pathBuilder.forLessPath(this.currentConfig, this.module);
      if (!this.fs.exists(lessPath)) {
        this.fs.copyTpl(
          this.templatePath('module.less'),
          this.destinationPath(lessPath)
        );
      } else {
        this.log(chalk.red('-> Less for module ' + this.moduleName + ' already exists!'));
      }
    },
    injectModuleIntoConfig: function () {
      var config = {};
      if (this.fs.exists('config.json')) {
        config = this.fs.readJSON('config.json');
      }
      config.modules = config.modules || [];
      if (config.modules.indexOf(this.moduleName) < 0) {
        config.modules.push(this.moduleName);
      }
      this.fs.writeJSON('config.json', config);
    }
  }
});
