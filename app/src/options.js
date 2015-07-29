module.exports = function (Generator) {
    Generator.option('app-name', {
        type: String,
        required: true,
        desc: 'App name, also used as angular module name',
        defaults: 'app'
    });
};
