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
                config = require(path.join(oaspGenTestUtils.testDirectory, 'gulp/lib/config-factory.js'))(require(path.join(oaspGenTestUtils.testDirectory, 'config.json')));
            });

            describe('index', function () {
                it('should return path to index', function () {
                    config.indexHtml.src().should.eql(['app/index.html']);
                });
            });

            describe('styles', function () {
                it('should contain paths to main less files', function () {
                    config.styles.src().should.eql([
                        'app/main/main.less',
                        'app/component-1/component-1.less',
                        'app/component-2/component-2.less'
                    ]);
                });
                it('should contain paths to all less files', function () {
                    config.styles.allSrc().should.eql([
                        'app/main/**/*.less',
                        'app/component-1/**/*.less',
                        'app/component-2/**/*.less'
                    ]);
                });
            });
            describe('i18n', function () {
                it('should build paths for i18n files', function () {
                    config.i18n.src().should.eql([
                        'app/main/i18n/**/*.json',
                        'app/component-1/i18n/**/*.json',
                        'app/component-2/i18n/**/*.json'
                    ]);
                });
            });
            describe('scripts', function () {
                it('should contain paths to js sources depending on modules', function () {
                    config.scripts.src().should.eql([
                        'app/*.module.js',
                        'app/main/main.module.js',
                        'app/main/**/*.module.js',
                        'app/main/**/!(*spec|*mock).js',
                        '.tmp/main/**/*.js',
                        'app/component-1/component-1.module.js',
                        'app/component-1/**/*.module.js',
                        'app/component-1/**/!(*spec|*mock).js',
                        '.tmp/component-1/**/*.js',
                        'app/component-2/component-2.module.js',
                        'app/component-2/**/*.module.js',
                        'app/component-2/**/!(*spec|*mock).js',
                        '.tmp/component-2/**/*.js']);
                });
                it('should contain paths to test sources depending on modules', function () {
                    config.scripts.testSrc().should.eql([
                        'app/*.mock.js',
                        'app/main/**/*.mock.js',
                        'app/component-1/**/*.mock.js',
                        'app/component-2/**/*.mock.js',
                        'app/*.spec.js',
                        'app/main/**/*.spec.js',
                        'app/component-1/**/*.spec.js',
                        'app/component-2/**/*.spec.js']);
                });
                it('should contain paths for linting depending on modules', function () {
                    config.scripts.lintSrc().should.eql([
                        'app/*.module.js',
                        'app/main/main.module.js',
                        'app/main/**/*.module.js',
                        'app/main/**/!(*spec|*mock).js',
                        '.tmp/main/**/*.js',
                        'app/component-1/component-1.module.js',
                        'app/component-1/**/*.module.js',
                        'app/component-1/**/!(*spec|*mock).js',
                        '.tmp/component-1/**/*.js',
                        'app/component-2/component-2.module.js',
                        'app/component-2/**/*.module.js',
                        'app/component-2/**/!(*spec|*mock).js',
                        '.tmp/component-2/**/*.js']);
                });
            });
        });
    });
};
