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

    // TODO: refactor
    initializing: function () {

        this.destinationPaths = oaspUtil.resolveParentModuleAndDestinationDirectoryPath(this);
        this.canCreateModule = true;

        if (this.destinationPaths) {
            var moduleAlreadyInjected;

            this.newModuleDirectoryPath = paths.join(this.destinationPaths.destinationDirectory, this.moduleName);
            this.newModuleFilePath = paths.join(this.newModuleDirectoryPath, paths.basename(this.newModuleDirectoryPath)) + '.module.js';
            this.newLessFilePath = paths.join(this.newModuleDirectoryPath, paths.basename(this.newModuleDirectoryPath)) + '.less';
            this.parsedParentModule = ngParseModule.parse(this.destinationPaths.moduleFilePath);
            // TODO: rename method
            this.newModuleName = this.parsedParentModule.name + '.' + oaspUtil.angularNamesBuilder.moduleName2(this.moduleName);

            moduleAlreadyInjected = this.parsedParentModule.dependencies.modules.indexOf(this.newModuleName) >= 0;

            if (moduleAlreadyInjected) {
                this.log(chalk.red('-> ' + this.newModuleName + ' already injected in the parent module defined in the ' + this.destinationPaths.moduleFilePath + ' file.'));
                this.canCreateModule = false;
            }
        }
        else {
            this.log(chalk.red('-> Can\'t find the main application module.'));
            this.canCreateModule = false;
        }

        if(this.canCreateModule){
            this.log(chalk.green('-> Generating module in directory: ' + this.newModuleDirectoryPath));
        }
    },
    writing: {
        injectModuleIntoParentModule: function () {
            if (this.canCreateModule) {
                this.parsedParentModule.dependencies.modules.push(this.newModuleName);
                this.parsedParentModule.save();
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