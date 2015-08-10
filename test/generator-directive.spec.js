'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs-extra');
var oaspGenTestUtils = require('./app-suite-testcases/oasp-generator-test-utils');
var mkdirp = require('mkdirp');

describe('oasp:module', function () {

    var runDirectiveGenerator = function (directory, argument, done) {
        mkdirp.sync(directory);
        process.chdir(directory);
        helpers.run(path.join(__dirname, '../directive'), {tmpdir: false})
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
                before(runDirectiveGenerator.bind(null, path.join(oaspGenTestUtils.testDirectory, appPath + '/component-1'), 'sample-component'));

                it('creates files', function () {
                    assert.file([
                            appPath + '/component-1/sample-component.directive.js',
                            testPath + '/component-1/sample-component.directive.spec.js'
                    ]);
                });

                it('creates correct spec and directive file', function () {
                    assert.fileContent(appPath + '/component-1/sample-component.directive.js', 'angular.module(\'app.component1\')');
                    assert.fileContent(appPath + '/component-1/sample-component.directive.js', '.directive(\'sampleComponent\'');
                    assert.fileContent(testPath + '/component-1/sample-component.directive.spec.js', 'module(\'app.component1\')');
                    assert.fileContent(testPath + '/component-1/sample-component.directive.spec.js', '<sample-component></sample-component>');
                });
            });
        });
    };


    executeTestCase('test-case-1', 'app', 'app');
    executeTestCase('test-case-2', 'src', 'test');
});
