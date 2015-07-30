'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

xdescribe('oasp:module', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../module'))
            .withArguments('new-module-name')
            .withOptions({ 'skip-install': true })
            .on('ready', function (generator) {
                generator.config.set('appPath', 'app');
                generator.config.set('appModule', 'app');
                generator.config.set('appModulePath', 'app/app.module.js');
                generator.config.save();
            }).on('end', done);
    });
    // TODO: repair test
    it('creates files', function () {
        assert.file([
            'app/new-module-name/new-module-name.module.js',
            'app/new-module-name/new-module-name.less'
        ]);
    });
});
