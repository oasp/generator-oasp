'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs-extra');
var rm = require('rimraf');
var bower = require('bower');
var testcases = [
    require('./app-suite-testcases/config-factory/config-factory.js'),
    require('./app-suite-testcases/simple/simple.js')
];
var output = path.join(os.tmpdir(), './temp-test');
describe('oasp:app', function () {

    before(function (done) {
        //for development to skip npm install and save time
        if (process.env['no-generate']) {
            process.chdir(output);
            done();
        } else {
            helpers.run(path.join(__dirname, '../app'))
                .inDir(output)
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
    testcases.forEach(function (testcaseFn) {
        var testcase = testcaseFn(output);
        describe(testcase.describe.message, function () {
            before(function (done) {
                if (testcase.files) {
                    //remove files from output
                    testcase.files.forEach(function (file) {
                        rm.sync(path.join(output, file));
                    });
                    //copy test case file into output
                    testcase.files.forEach(function (file) {
                        fs.copySync(path.join(testcase.basepath, file), path.join(output, file));
                    });
                    bower.commands.install().on('end', function () {
                        done();
                    });
                }
            });
            describe('template', testcase.describe.testcase);
        });
    });
});
