module.exports = function (Generator) {
    Generator.option('app-name', {
        type: String,
        required: true,
        desc: 'App name, also used as angular module name',
        defaults: 'app'
    });

    Generator.option('src-path', {
        type: String,
        required: true,
        desc: 'Base path for sources',
        defaults: 'app'
    });

    Generator.option('test-path', {
        type: String,
        required: true,
        desc: 'Base path for specs',
        defaults: 'app'
    });

    Generator.option('temp-path', {
        type: String,
        required: true,
        desc: 'Base temp path',
        defaults: '.tmp'
    });

    Generator.option('dist-path', {
        type: String,
        required: true,
        desc: 'Base output path',
        defaults: 'dist'
    });

    Generator.option('test-output-path', {
        type: String,
        required: true,
        desc: 'Base path for test reports and coverage',
        defaults: 'test-output'
    });
};
