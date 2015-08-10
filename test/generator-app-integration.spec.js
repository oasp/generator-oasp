'use strict';

var path = require('path'),
    helpers = require('yeoman-generator').test,
    oaspGenTestUtils = require('./app-suite-testcases/oasp-generator-test-utils'),
    specs = [
       // require('./app-suite-testcases/simple/simple.js'),
       // require('./app-suite-testcases/config-factory/config-factory.js'),
        require('./app-suite-testcases/non-default-source-directories/non-default-source-directories.js')
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

    specs.forEach(function (specFn) {
        specFn();
    });
});
