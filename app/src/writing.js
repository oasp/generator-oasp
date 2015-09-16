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
        Object.keys(this.staticFiles).forEach(function (file) {
            that.fs.copy(
                that.templatePath(file),
                that.destinationPath(that.staticFiles[file])
            );
        });
    };

    Generator.prototype.writeYeomanConfig = function () {
        this.config.save();
    };

    Generator.prototype.generateDependencies = function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    };

    Generator.prototype.writeConfigJson = function () {
        var config = this.fs.readJSON(this.destinationPath('config.json'));
        config.paths = this.paths;
        this.fs.writeJSON(this.destinationPath('config.json'), config);
    };
};
