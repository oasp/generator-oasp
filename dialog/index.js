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

        var mainModuleDirectory,
            destinationModulePath,
            destinationDirectory,
            mainModulePath;

        this.canCreateDialog = true;

        if (this.moduleName) {
            // create dialog in the mainApp/moduleName dir, if not exist then call module generator to generate it

            mainModuleDirectory = oaspUtil.findMainModuleDirectory(this);
            destinationModulePath = paths.join(mainModuleDirectory, this.moduleName, this.moduleName) + '.module.js';
            mainModulePath = oaspUtil.findMainModulePath(this);
            this.angularModuleName = ngParseModule.parse(mainModulePath).name + '.' + oaspUtil.angularNamesBuilder.moduleName2(this.moduleName);
            if (!this.fs.exists(destinationModulePath)) {
                this.env.cwd = this.destinationPath();
                this.composeWith('oasp:module', {args: [this.moduleName]});
            }
            destinationDirectory = paths.join(mainModuleDirectory, this.moduleName);
        }
        else {
            // create dialog in the current directory in the nearest module

            destinationModulePath = oaspUtil.findClosestModulePath(this);
            if (destinationModulePath) {
                var module = ngParseModule.parse(destinationModulePath);
                this.angularModuleName = module.name;
                destinationDirectory = oaspUtil.findDestinationDirectory(this);
            }
            else {
                this.log(chalk.red('-> Can\'t find the main application module.'));
                this.canCreateDialog = false;
            }
        }

        if (this.canCreateDialog) {
            this.controllerName = oaspUtil.angularNamesBuilder.controllerName(this.dialogName);
            this.controllerPath = paths.join(destinationDirectory, this.dialogName, this.dialogName + '.controller.js');
            this.controllerSpecPath = paths.join(destinationDirectory, this.dialogName, this.dialogName + '.controller.spec.js');
            this.dialogPath = paths.join(destinationDirectory, this.dialogName, this.dialogName + '.tpl.html');

            this.log(chalk.green('-> Generating dialog with controller in module: ' + this.angularModuleName));
        }
    },
    writing: {
        saveDialogTemplate: function () {
            if (this.canCreateDialog) {
                this.fs.copyTpl(this.templatePath('dialog.html'), this.dialogPath, this);
                this.log(this.dialogPath);
            }
        },
        saveDialogControllerAndSpecFile: function () {
            if (this.canCreateDialog) {
                this.fs.copyTpl(this.templatePath('controller.js'), this.controllerPath, this);
                this.fs.copyTpl(this.templatePath('controller-spec.js'), this.controllerSpecPath, this);
            }
        }
    }
});