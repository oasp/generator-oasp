'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('oasp:app', function () {
    describe('simple module name', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ 'skip-install': true, 'appName': 'sample' })
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

    describe('camelCase module name', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ 'skip-install': true, 'appName': 'sampleAppName' })
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

    describe('train-case module name', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ 'skip-install': true, 'appName': 'sample-app-name' })
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
});
