'use strict';
var yeoman = require('yeoman-generator');
var sharedUtils = require('../shared-utils.js');
var chalk = require('chalk');
var paths = require('path');

module.exports = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        this.argument('moduleName', {
            type: String,
            required: true,
            desc: 'Module name'
        });
        this.isCalledFromRoot = sharedUtils.isCalledFromRoot(this.destinationPath(), this.env.cwd);
        this.appPath = 'app';

        if (this.isCalledFromRoot) {
            this.targetPartentModule = sharedUtils.moduleFinder.findAppModule(this.destinationPath(), this.appPath);
            this.targetBasePath = this.destinationPath(this.appPath);
        } else {
            this.targetPartentModule = sharedUtils.moduleFinder.findClosestModule(this.destinationPath(), this.env.cwd);
            this.targetBasePath = this.env.cwd;
        }
        if (this.targetPartentModule === null) {
            this.env.error(chalk.red('-> Can\'t find parent module.'));
        }

        this.targetModuleName = sharedUtils.nameBuilder.ngModuleName(this.targetPartentModule.parsedModule.name, this.moduleName);
        this.targetFileName = sharedUtils.nameBuilder.trainModuleName(this.moduleName);
    },
    writing: {
        injectModuleIntoParentModule: function () {
            if (this.targetPartentModule.parsedModule.dependencies.modules.indexOf(this.targetModuleName) < 0) {
                this.targetPartentModule.parsedModule.dependencies.modules.push(this.targetModuleName);
                this.log(chalk.green('   inject ') + this.targetModuleName + chalk.green(' into ') + this.targetPartentModule.fileName);
                this.targetPartentModule.parsedModule.save();
            }
        },
        saveModuleFile: function () {
            this.fs.copyTpl(this.templatePath('module.js'), paths.join(this.targetBasePath, this.targetFileName, this.targetFileName + '.module.js'), this);
        },
        saveLessFile: function () {
            this.fs.copyTpl(this.templatePath('module.less'), paths.join(this.targetBasePath, this.targetFileName, this.targetFileName + '.less'), this);
        }
    }
});
