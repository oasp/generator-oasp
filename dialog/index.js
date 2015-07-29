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

    // TODO: refactor
    initializing: function () {
        this.canCreateDialog = true;

        this.currentConfig = this.config.getAll();

        // module name given - create dialog in module appMainModule/moduleName
        if (this.moduleName) {
            // if module does not exist - create it

            if (!this.fs.exists(paths.join(this.destinationPath(), this.currentConfig.appPath, this.moduleName, this.moduleName) + 'module.js')) {
                this.env.cwd = this.destinationPath();
                this.composeWith('oasp:module', {args: [this.moduleName]});
            }
            this.pathPrefix = paths.join(this.destinationPath(), this.currentConfig.appPath, this.moduleName);
        }
        // module name not given - find the nearest one and get it's name, otherwise throw error
        else {
            this.destinationPaths = oaspUtil.resolveParentModuleAndDestinationDirectoryPath(this);
            if (this.destinationPaths) {
                var module = ngParseModule.parse(this.destinationPaths.moduleFilePath);
                this.moduleName = module.name;
                this.pathPrefix = this.destinationPaths.destinationDirectory;
            }
            else {
                this.log(chalk.red('-> Can\'t find the main application module.'));
                this.canCreateDialog = false;
            }
        }

        if (this.canCreateDialog) {
            this.controllerName = oaspUtil.angularNamesBuilder.controllerName(this.dialogName);
            this.controllerPath = paths.join(this.pathPrefix, this.dialogName, this.dialogName + '.controller.js');
            this.controllerSpecPath = paths.join(this.pathPrefix, this.dialogName, this.dialogName + '.controller.spec.js');
            this.dialogPath = paths.join(this.pathPrefix, this.dialogName, this.dialogName + '.tpl.html');

            this.log(chalk.green('-> Generating dialog with controller in module: ' + this.moduleName));
        }
    },
    writing: {
        saveDialogTemplate: function () {
            if (this.canCreateDialog) {
                this.fs.copyTpl(this.templatePath('dialog.html'), this.dialogPath, this);
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