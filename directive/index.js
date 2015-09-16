'use strict';
var chalk = require('chalk');
var paths = require('path');
var oaspBase = require('../oasp-base-generator.js');

module.exports = oaspBase.extend({
    constructor: function () {
        oaspBase.apply(this, arguments);
        this.argument('directiveName', {
            type: String,
            required: true,
            desc: 'Directive name'
        });
        this.targetBasePath = this.env.cwd;
        this.targetSpecBasePath = this.pathBuilder.calculateTestBasePath(this.targetBasePath, this.destinationPath(this.paths.src), this.destinationPath(this.paths.testSrc));

        if (this.targetParentModule === null) {
            this.env.error(chalk.red('-> Can\'t find parent module.'));
        }

        this.targetModuleName = this.targetParentModule.parsedModule.name;
        this.trainItemName = this.nameBuilder.trainItemName(this.directiveName);
        this.directiveName = this.nameBuilder.ngDirectiveName(this.directiveName);
    },
    writing: {
        saveCntlFile: function () {
            this.fs.copyTpl(this.templatePath('directive.js'), paths.join(this.targetBasePath, this.trainItemName + '.directive.js'), this);
            this.fs.copyTpl(this.templatePath('directive-spec.js'), paths.join(this.targetSpecBasePath, this.trainItemName + '.directive.spec.js'), this);
        }
    }
});
