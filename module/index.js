'use strict';
var yeoman = require('yeoman-generator');
var oaspUtil = require('../utils.js');
var chalk = require('chalk');
var ngParseModule = require('ng-parse-module');

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('moduleName', {
      type: String,
      required: true,
      desc: 'Module name'
    });
  },

  initializing: function () {
    this.currentConfig = this.config.getAll();
    this.module = oaspUtil.expandModule(this.moduleName);
    this.angularModuleName = oaspUtil.angularNamesBuilder.moduleName(this.currentConfig, this.module);
    this.modulePath = oaspUtil.pathBuilder.buildPath('{app}/{module}/js/{submodule}.module.js', this.currentConfig, this.module);
    this.lessPath = oaspUtil.pathBuilder.buildPath('{app}/{module}/css/{submodule}.less', this.currentConfig, this.module);
    this.log('-> Generating module ' + this.angularModuleName + '.');
  },
  writing: {
    injectModuleIntoApp: function () {
      if (this.fs.exists(this.currentConfig.appModulePath)) {
        var results = ngParseModule.parse(this.currentConfig.appModulePath);
        if (results.dependencies.modules.indexOf(this.angularModuleName) < 0) {
          results.dependencies.modules.push(this.angularModuleName);
          results.save();
        }
      } else {
        this.log(chalk.red('-> App module file ' + this.currentConfig.appModulePath + ' not exists!'));
      }
    },
    saveModuleFile: function () {
      var context = {
        moduleName: this.angularModuleName
      };
      if (!this.fs.exists(this.modulePath)) {
        this.fs.copyTpl(this.templatePath('module.js'), this.destinationPath(this.modulePath), context);
      } else {
        this.log(chalk.red('-> Module ' + this.angularModuleName + ' already exists!'));
      }
    },
    saveLessFile: function () {
      if (!this.fs.exists(this.lessPath)) {
        this.fs.copyTpl(this.templatePath('module.less'), this.destinationPath(this.lessPath));
      } else {
        this.log(chalk.red('-> Less for module ' + this.moduleName + ' already exists!'));
      }
    },
    injectModuleIntoConfig: function () {
      var config = {}, done = this.async();
      if (this.fs.exists('config.json')) {
        config = this.fs.readJSON('config.json');
      }
      config.modules = config.modules || [];
      if (config.modules.indexOf(this.moduleName) < 0) {
        config.modules.push(this.moduleName);
      }
      this.fs.writeJSON('config.json', config);
      this.fs.commit(done);
    }
  }
});
