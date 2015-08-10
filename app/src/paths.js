var _ = require('underscore');
_.str = require('underscore.string');

module.exports = function (Generator) {
    Generator.prototype.setPaths = function () {
        this.paths = {
            tmp: this.options['temp-path'],
            dist: this.options['dist-path'],
            src: this.options['src-path'],
            testSrc: this.options['test-path'],
            testOutput: this.options['test-output-path']
        };
    };
};
