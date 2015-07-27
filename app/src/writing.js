module.exports = function (Generator) {
    Generator.prototype.writeApp = function () {
        var that = this;
        Object.keys(this.templateFiles).forEach(function (file) {
            that.fs.copyTpl(
                that.templatePath(file),
                that.destinationPath(that.templateFiles[file]),
                that
            );
        });
        this.staticFiles.forEach(function (file) {
            that.fs.copy(
                that.templatePath(file),
                that.destinationPath(file)
            );
        });
    };
    Generator.prototype.generateDependencies = function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    };
};
