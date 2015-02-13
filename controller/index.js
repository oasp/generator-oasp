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
    this.argument('controllerName', {
      type: String,
      required: true,
      desc: 'Controller name'
    });
  },

  initializing: function () {
    this.currentConfig = this.config.getAll();
    this.module = oaspUtil.expandModule(this.moduleName);
    this.controllerPath = oaspUtil.pathBuilder.forControllerFile(this.currentConfig, this.module, this.controllerName);
    this.controllerSpecPath = oaspUtil.pathBuilder.forControllerSpecFile(this.currentConfig, this.module, this.controllerName);
    this.controllerName = oaspUtil.angularNamesBuilder.controllerName(this.controllerName);
    this.moduleName = oaspUtil.angularNamesBuilder.moduleName(this.currentConfig, this.module);
    this.log('-> Generating controller ' + this.moduleName + '.');
  },
  writing: {
    saveControllerFile: function () {
      if (!this.fs.exists(this.controllerPath)) {
        console.log(this.controllerPath);
        this.fs.copyTpl(
          this.templatePath('controller.js'),
          this.destinationPath(this.controllerPath),
          {
            moduleName: this.moduleName,
            controllerName: this.controllerName
          }
        );
        this.fs.copyTpl(
          this.templatePath('controller-spec.js'),
          this.destinationPath(this.controllerSpecPath),
          {
            moduleName: this.moduleName,
            controllerName: this.controllerName
          }
        );
      } else {
        this.log(chalk.red('-> Controller ' + this.controllerPath + ' already exists!'));
      }
    }
  }
});
