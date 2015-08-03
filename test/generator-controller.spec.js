'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs-extra');
var oaspGenTestUtils = require('./app-suite-testcases/oasp-generator-test-utils');
var mkdirp = require('mkdirp');

describe('oasp:module', function () {

    var runControllerGenerator = function (directory, argument, done) {
        mkdirp.sync(directory);
        process.chdir(directory);
        helpers.run(path.join(__dirname, '../controller'), {tmpdir: false})
            .withArguments(argument)
            .withOptions({ 'skip-install': true })
            .on('end', done);
    };

    before(function (done) {
        helpers.testDirectory(oaspGenTestUtils.testDirectory, function () {
            fs.copy(path.join(__dirname, 'generator-templates/test-case-1'), oaspGenTestUtils.testDirectory, done);
        });
    });


    describe('calling generator', function () {

        before(runControllerGenerator.bind(null, path.join(oaspGenTestUtils.testDirectory,'app/component-1'), 'sample-controller'));

        it('creates files', function () {
            assert.file([
                'app/component-1/sample-controller.controller.js',
                'app/component-1/sample-controller.controller.spec.js'
            ]);
        });

        it('creates correct spec and controller file', function () {
            assert.fileContent('app/component-1/sample-controller.controller.js', 'angular.module(\'app.component1\')');
            assert.fileContent('app/component-1/sample-controller.controller.js', '.controller(\'SampleControllerCntl\'');
            assert.fileContent('app/component-1/sample-controller.controller.spec.js', 'SampleControllerCntl');
        });
    });
});
