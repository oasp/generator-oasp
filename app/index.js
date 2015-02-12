'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.config.set('appPath','app');
    this.config.set('appModule','app');
    this.config.save();
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
        'Welcome to the impeccable ' + chalk.red('OASP') + ' generator!'
    ));
  },

  writing: {
    app: function () {
      this.directory(this.sourceRoot(), this.destinationRoot());
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
