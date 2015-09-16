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

    var executeTestCase = function (testcase, appPath, testPath) {

        describe(testcase, function () {
            before(function (done) {
                helpers.testDirectory(oaspGenTestUtils.testDirectory, function () {
                    fs.copy(path.join(__dirname, 'generator-templates', testcase), oaspGenTestUtils.testDirectory, done);
                });
            });

            describe('calling generator', function () {

                before(runControllerGenerator.bind(null, path.join(oaspGenTestUtils.testDirectory, appPath + '/component-1'), 'sample-controller'));

                it('creates files', function () {
                    assert.file([
                            appPath + '/component-1/sample-controller.controller.js',
                            testPath + '/component-1/sample-controller.controller.spec.js'
                    ]);
                });

                it('creates correct spec and controller file', function () {
                    assert.fileContent(appPath + '/component-1/sample-controller.controller.js', 'angular.module(\'app.component1\')');
                    assert.fileContent(appPath + '/component-1/sample-controller.controller.js', '.controller(\'SampleControllerCntl\'');
                    assert.fileContent(testPath + '/component-1/sample-controller.controller.spec.js', 'SampleControllerCntl');
                });
            });
        });
    };

    executeTestCase('test-case-1', 'app','app');
    executeTestCase('test-case-2', 'src','test');
});
