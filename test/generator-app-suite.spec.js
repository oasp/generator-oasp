'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test,
    oaspGenTestUtils = require('./app-suite-testcases/oasp-generator-test-utils'),
    specs = [
        require('./app-suite-testcases/simple/simple.js'),
        require('./app-suite-testcases/config-factory/config-factory.js')
    ];
describe('oasp:app', function () {
    before(function (done) {
        //for development to skip npm install and save time
        if (process.env['no-generate']) {
            process.chdir(oaspGenTestUtils.testDirectory);
            done();
        } else {
            helpers.run(path.join(__dirname, '../app'))
                .inDir(oaspGenTestUtils.testDirectory)
                .withOptions({ 'skip-install': false })
                .on('end', done);
        }
    });

    it('creates files', function () {
        assert.file([
            'bower.json',
            'package.json',
            '.editorconfig',
            '.jshintrc'
        ]);
    });

    specs.forEach(function (specFn) {
        specFn();
    });
});
