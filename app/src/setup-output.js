module.exports = function (Generator) {

    var fixPath = function (inputPath, srcPath, testPath) {
        if (inputPath.indexOf('app/') === 0) {
            return inputPath.replace('app/', srcPath + '/');
        } else if (inputPath.indexOf('test/') === 0) {
            return inputPath.replace('test/', testPath + '/');
        }
        return inputPath;
    };

    Generator.prototype.fixOutputPaths = function () {
        var that = this;

        Object.keys(that.staticFiles).forEach(function (file) {
            that.staticFiles[file] = fixPath(that.staticFiles[file], that.paths.src, that.paths.testSrc);
        });
        Object.keys(that.templateFiles).forEach(function (file) {
            that.templateFiles[file] = fixPath(that.templateFiles[file], that.paths.src, that.paths.testSrc);
        });
    };
};
