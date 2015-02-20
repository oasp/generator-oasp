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
    this.argument('cntlName', {
      type: String,
      required: true,
      desc: 'Controller name'
    });
  },

  initializing: function () {
    this.currentConfig = this.config.getAll();
    this.module = oaspUtil.expandModule(this.moduleName);
    this.moduleName = oaspUtil.angularNamesBuilder.moduleName(this.currentConfig, this.module);
    this.itemPath = oaspUtil.pathBuilder.buildPath('{app}/{module}/js/{item}.controller.js', this.currentConfig, this.module, this.cntlName);
    this.itemSpecPath = oaspUtil.pathBuilder.buildPath('{app}/{module}/js/{item}.controller.spec.js', this.currentConfig, this.module, this.cntlName);
    this.controllerName = oaspUtil.angularNamesBuilder.controllerName(this.cntlName);
    this.log('-> Generating controller ' + this.moduleName + '.');
  },
  writing: {
    saveControllerFile: function () {
      if (!this.fs.exists(this.itemPath)) {
        var context = {
          moduleName: this.moduleName,
          controllerName: this.controllerName
        };
        this.fs.copyTpl(this.templatePath('controller.js'), this.destinationPath(this.itemPath), context);
        this.fs.copyTpl(this.templatePath('controller-spec.js'), this.destinationPath(this.itemSpecPath), context);
      } else {
        this.log(chalk.red('-> Controller ' + this.itemPath + ' already exists!'));
      }
    }
  }
});
