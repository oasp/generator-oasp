'use strict';
var chalk = require('chalk');
var paths = require('path');
var oaspBase = require('../oasp-base-generator.js');

module.exports = oaspBase.extend({
    constructor: function () {
        oaspBase.apply(this, arguments);
        this.argument('moduleName', {
            type: String,
            required: true,
            desc: 'Module name'
        });

        if (this.isCalledFromRoot) {
            this.targetBasePath = this.destinationPath(this.appPath);
        } else {
            this.targetBasePath = this.env.cwd;
        }
        if (this.targetParentModule === null) {
            this.env.error(chalk.red('-> Can\'t find parent module.'));
        }

        this.targetModuleName = this.nameBuilder.ngModuleName(this.targetParentModule.parsedModule.name, this.moduleName);
        this.trainItemName = this.nameBuilder.trainItemName(this.moduleName);
    },
    writing: {
        injectModuleIntoParentModule: function () {
            if (this.targetParentModule.parsedModule.dependencies.modules.indexOf(this.targetModuleName) < 0) {
                this.targetParentModule.parsedModule.dependencies.modules.push(this.targetModuleName);
                this.log(chalk.green('   inject ') + this.targetModuleName + chalk.green(' into ') + this.targetParentModule.fileName);
                this.targetParentModule.parsedModule.save();
            }
        },
        saveModuleFile: function () {
            this.fs.copyTpl(this.templatePath('module.js'), paths.join(this.targetBasePath, this.trainItemName, this.trainItemName + '.module.js'), this);
        },
        saveLessFile: function () {
            this.fs.copyTpl(this.templatePath('module.less'), paths.join(this.targetBasePath, this.trainItemName, this.trainItemName + '.less'), this);
        }
    }
});
