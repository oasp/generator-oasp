module.exports = function (Generator) {

    Generator.prototype.defineOptions = function () {
        this.option('appName', {
            type: String,
            required: true,
            desc: 'App name',
            defaults: 'app'
        });
    };
};
