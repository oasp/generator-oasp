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
    this.argument('dirName', {
      type: String,
      required: true,
      desc: 'Controller name'
    });
  },

  initializing: function () {
    this.currentConfig = this.config.getAll();
    this.module = oaspUtil.expandModule(this.moduleName);
    this.moduleName = oaspUtil.angularNamesBuilder.moduleName(this.currentConfig, this.module);
    this.itemPath = oaspUtil.pathBuilder.buildPath('{app}/{module}/js/{item}.directive.js', this.currentConfig, this.module, this.dirName);
    this.itemSpecPath = oaspUtil.pathBuilder.buildPath('{app}/{module}/js/{item}.directive.spec.js', this.currentConfig, this.module, this.dirName);
    this.directiveName = oaspUtil.angularNamesBuilder.directiveName(this.dirName);
    this.log('-> Generating directive ' + this.moduleName + '.');
  },
  writing: {
    saveControllerFile: function () {
      var context = {
        moduleName: this.moduleName,
        directiveName: this.controllerName
      };
      if (!this.fs.exists(this.itemPath)) {
        this.fs.copyTpl(this.templatePath('directive.js'), this.destinationPath(this.itemPath), context);
        this.fs.copyTpl(this.templatePath('directive-spec.js'), this.destinationPath(this.itemSpecPath), context);
      } else {
        this.log(chalk.red('-> Controller ' + this.itemPath + ' already exists!'));
      }
    }
  }
});
