var files = require('../files.json');

module.exports = function (Generator) {

    Generator.prototype.prepareFiles = function () {
        var that = this;
        that.staticFiles = {};
        files.staticAppFiles.forEach(function (file) {
            that.staticFiles[file] = file;
        });
        that.templateFiles = {};
        files.appFiles.forEach(function (file) {
            that.templateFiles[file] = file;
        });
        files.templateFiles.forEach(function (file) {
            var output = file;
            if (file.indexOf('_') === 0) {
                output = file.replace('_', '');
            }
            that.templateFiles[file] = output;
        });
    };
};
