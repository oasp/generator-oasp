'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('oasp:app', function () {
    describe('default generator', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ 'skip-install': true, 'app-name': 'sample' })
                .on('end', done);
        });

        it('creates files', function () {
            assert.file([
                'bower.json',
                'package.json',
                '.editorconfig',
                '.jshintrc'
            ]);
        });
    });

    describe('with simple module name', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ 'skip-install': true, 'app-name': 'sample' })
                .on('end', done);
        });

        it('creates files', function () {
            assert.file([
                'app/sample.module.js',
                'app/sample.less',
                'app/sample.module.spec.js'
            ]);
        });


        it('creates correct module names', function () {
            assert.fileContent('app/sample.module.js', /angular.module\('sample'/);
        });

        it('creates correct app init in html', function () {
            assert.fileContent('app/index.html', /data-ng-app="sample"/);
        });

        it('creates name in bower.json', function () {
            assert.fileContent('bower.json', /"name": "sample"/);
        });
    });

    describe('with camelCase module name', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ 'skip-install': true, 'app-name': 'sampleAppName' })
                .on('end', done);
        });

        it('creates files', function () {
            assert.file([
                'app/sample-app-name.module.js',
                'app/sample-app-name.less',
                'app/sample-app-name.module.spec.js'
            ]);
        });


        it('creates correct module names', function () {
            assert.fileContent('app/sample-app-name.module.js', /angular.module\('sampleAppName'/);
        });

        it('creates correct app init in html', function () {
            assert.fileContent('app/index.html', /data-ng-app="sampleAppName"/);
        });

        it('creates name in bower.json', function () {
            assert.fileContent('bower.json', /"name": "sample-app-name"/);
        });
    });

    describe('with overridden source paths', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({
                    'skip-install': true,
                    'app-name': 'sample-app-name',
                    'src-path': 'c_src',
                    'test-path': 'c_test',
                    'dist-path': 'c_dist',
                    'test-output-path': 'c_target'
                })
                .on('end', done);
        });

        it('creates files', function () {
            assert.file([
                'c_src/sample-app-name.module.js',
                'c_src/sample-app-name.less',
                'c_test/sample-app-name.module.spec.js'
            ]);
        });


        it('creates correct module names', function () {
            assert.fileContent('c_src/sample-app-name.module.js', /angular.module\('sampleAppName'/);
        });

        it('creates correct app init in html', function () {
            assert.fileContent('c_src/index.html', /data-ng-app="sampleAppName"/);
        });

        it('creates name in bower.json', function () {
            assert.fileContent('bower.json', /"name": "sample-app-name"/);
        });
    });

});
