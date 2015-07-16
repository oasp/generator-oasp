var path = require('path'),
    oaspGenTestUtils = require('../oasp-generator-test-utils');

module.exports = function () {
    require('chai').should();

    describe('config-factory', function () {
        before(function (done) {
            oaspGenTestUtils.deleteOldFilesAndCopyNewOnes(['config.json'], __dirname);
            oaspGenTestUtils.runBowerInstallAndCallDone(done);
        });
        describe('template', function () {
            var config;
            before(function () {
                config = require(path.join(oaspGenTestUtils.testDirectory, 'gulp/configFactory.js'))(require(path.join(oaspGenTestUtils.testDirectory, 'config.json')));
            });

            describe('index', function () {
                it('should return path to index', function () {
                    config.index.src().should.equal('test_app/index.html');
                });
            });
            describe('scripts', function () {
                it('should contain path to js sources depending on modules', function () {
                    config.js.src().should.eql([
                        'test_app/*.module.js',

                        'test_app/main/js/**/**.module.js',
                        'test_app/main/js/**/!(*spec|*mock).js',
                        'test_tmp/main/js/**/*.js',

                        'test_app/parent/js/**/**.module.js',
                        'test_app/parent/js/**/!(*spec|*mock).js',
                        'test_tmp/parent/js/**/*.js',

                        'test_app/parent/sub/js/**/**.module.js',
                        'test_app/parent/sub/js/**/!(*spec|*mock).js',
                        'test_tmp/parent/sub/js/**/*.js']);
                });
            });
        });
    });
};
