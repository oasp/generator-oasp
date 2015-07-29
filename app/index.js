'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var Generator = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        require('./src/options.js')(this);

        this.props = {};
    },

    prompting: function () {
        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the impeccable ' + chalk.red('OASP') + ' generator!'));
    }
});

require('./src/files.js')(Generator);
require('./src/app-name.js')(Generator);

require('./src/writing.js')(Generator);

module.exports = Generator;
