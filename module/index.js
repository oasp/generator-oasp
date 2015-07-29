'use strict';
var yeoman = require('yeoman-generator');
var oaspUtil = require('../utils.js');
var chalk = require('chalk');
var paths = require('path');
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

        this.canCreateModule = true;

        var destinationModulePath = oaspUtil.findClosestModulePath(this);
        var destinationDirectory = oaspUtil.findDestinationDirectory(this);

        if (destinationModulePath) {
            this.parsedDestinationModule = ngParseModule.parse(destinationModulePath);
            if (this.parsedDestinationModule.dependencies.modules.indexOf(this.parsedDestinationModule.name) < 0) {
                this.newModuleDirectoryPath = paths.join(destinationDirectory, this.moduleName);
                this.newModuleName = this.parsedDestinationModule.name + '.' + oaspUtil.angularNamesBuilder.moduleName2(this.moduleName);
                this.newModuleFilePath = paths.join(this.newModuleDirectoryPath, paths.basename(this.newModuleDirectoryPath)) + '.module.js';
                this.newLessFilePath = paths.join(this.newModuleDirectoryPath, paths.basename(this.newModuleDirectoryPath)) + '.less';

                this.log(chalk.green('-> Generating module in directory: ' + this.newModuleDirectoryPath));
            }
            else {
                this.log(chalk.red('-> Module ' + this.parsedDestinationModule.name + ' already injected in the parent module defined in the ' + destinationModulePath + ' file.'));
                this.canCreateModule = false;
            }
        }
        else {
            this.log(chalk.red('-> Can\'t find the main application module.'));
            this.canCreateModule = false;
        }
    },
    writing: {
        injectModuleIntoParentModule: function () {
            if (this.canCreateModule) {
                this.parsedDestinationModule.dependencies.modules.push(this.newModuleName);
                this.parsedDestinationModule.save();
            }
        },
        saveModuleFile: function () {
            if (this.canCreateModule) {
                this.fs.copyTpl(this.templatePath('module.js'), this.newModuleFilePath, {moduleName: this.newModuleName});
            }
        },
        saveLessFile: function () {
            if (this.canCreateModule) {
                this.fs.copyTpl(this.templatePath('module.less'), this.newLessFilePath);
            }
        }
    }
});