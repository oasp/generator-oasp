'use strict';
var chalk = require('chalk');
var paths = require('path');
var oaspBase = require('../oasp-base-generator.js');
var mkdirp = require('mkdirp');

module.exports = oaspBase.extend({
    constructor: function () {
        oaspBase.apply(this, arguments);
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

        if (this.moduleName) {
            this.targetParentModule = this.moduleFinder.findModuleByName(this.destinationPath(), this.paths.src, this.moduleName);
            this.targetBasePath = this.targetParentModule ? this.targetParentModule.moduleDir : null;
        } else {
            this.targetParentModule = this.moduleFinder.findClosestModule(this.destinationPath(), this.env.cwd);
            this.targetBasePath = this.env.cwd;
        }

        if (this.targetParentModule === null) {
            this.env.error(chalk.red('-> Can\'t find parent module.'));
        }

        this.targetModuleName = this.nameBuilder.ngModuleName(this.targetParentModule.parsedModule.name, this.moduleName);
        this.trainItemName = this.nameBuilder.trainItemName(this.dialogName);
    },
    writing: {
        saveModuleFile: function () {
            var dialogDirectory = paths.join(this.targetBasePath, this.trainItemName),
                currentCwd = process.cwd();
            mkdirp.sync(dialogDirectory);
            this.env.cwd = dialogDirectory;
            this.composeWith('oasp:controller', {args: [this.trainItemName]});
            process.chdir(currentCwd);
        },
        copyHtml: function () {
            this.fs.copyTpl(this.templatePath('dialog.html'), paths.join(this.targetBasePath, this.trainItemName, this.trainItemName + '.tpl.html'), this);
        }
    }
});
