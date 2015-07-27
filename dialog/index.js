'use strict';
var yeoman = require('yeoman-generator');
var oaspUtil = require('../utils.js');
var chalk = require('chalk');
var paths = require('path');
var ngParseModule = require('ng-parse-module');

module.exports = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        this.argument('dialogName', {
            type: String,
            required: true,
            desc: 'Dialog name'
        });
        this.argument('moduleName', {
            type: String,
            required: false,
            desc: 'Module name'
        });
    },

    initializing: function () {
        this.currentConfig = this.config.getAll();
        this.controllerName = oaspUtil.angularNamesBuilder.controllerName(this.dialogName);

        if (this.moduleName) {
            this.pathPrefix = paths.join(this.destinationPath(), this.currentConfig.appPath, this.moduleName);
        }
        else {
            this.pathPrefix = this.env.cwd;
            var module = ngParseModule.parse(paths.join(this.env.cwd, paths.basename(this.env.cwd)) + '.module.js');
            this.moduleName = module.name;
        }

        this.controllerPath = paths.join(this.pathPrefix, this.dialogName, this.dialogName + '.controller.js');
        this.controllerSpecPath = paths.join(this.pathPrefix, this.dialogName, this.dialogName + '.controller.spec.js');
        this.dialogPath = paths.join(this.pathPrefix, this.dialogName, this.dialogName + '.html');
    },
    writing: {
        saveDialogAndControllerFiles: function () {
            if (!this.fs.exists(this.controllerPath) && !this.fs.exists(this.controllerSpecPath) && !this.fs.exists(this.dialogPath)) {
                this.fs.copyTpl(this.templatePath('controller.js'), this.controllerPath, this);
                this.fs.copyTpl(this.templatePath('controller-spec.js'), this.controllerSpecPath, this);
                this.fs.copyTpl(this.templatePath('dialog.html'), this.dialogPath, this);

                this.log('-> Generating dialog with controller in module: ' + this.moduleName);
            }
            else {
                this.log(chalk.red('-> One or more of the following files already exist(s):'));
                this.log(this.dialogPath);
                this.log(this.controllerPath);
                this.log(this.controllerSpecPath);
            }
        }
    }
});