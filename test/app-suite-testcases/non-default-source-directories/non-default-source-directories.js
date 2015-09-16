var chai = require('chai'),
    assert = require('yeoman-generator').assert,
    path = require('path'),
    oaspGenTestUtils = require('../oasp-generator-test-utils');

module.exports = function () {
    chai.should();

    describe('non-default-source-directories', function () {
        before(function (done) {
            //unfortunately stateful
            oaspGenTestUtils.deleteOldFiles(['app', 'dist', '.tmp']);
            oaspGenTestUtils.deleteOldFilesAndCopyNewOnes(['src', 'test', 'config.json'], __dirname);
            oaspGenTestUtils.runBowerInstallAndCallDone(done);
        });
        describe('template', function () {
            describe('build:develop', function () {
                before(function (done) {
                    oaspGenTestUtils.runGulpAndCallDone(['clean'], function () {
                        oaspGenTestUtils.runGulpAndCallDone(['build:develop'], done);
                    });
                });

                describe('styles', function () {
                    it('should compile less file collecting code from whole app, allowing includes and propagating variables between modules', function () {
                        var outputLess = oaspGenTestUtils.resolvePathInTestDirectory('target-tmp/css/oasp.css');
                        assert.fileContent(outputLess, /\.class1/);
                        assert.fileContent(outputLess, /\.class2/);
                    });
                    it('should inject css file into main html', function () {
                        oaspGenTestUtils.assert.contaisStyle('target-tmp/index.html', 'css/oasp.css');
                    });
                });

                describe('sprites', function () {
                    it('should combine png files from sprite directory and generate associated css file and image', function () {
                        var outputSprite = oaspGenTestUtils.resolvePathInTestDirectory('target-tmp/css/sprite.css');
                        assert.fileContent(outputSprite, /\.icon-de-24/);
                        assert.fileContent(outputSprite, /\.icon-en-24/);
                        assert.fileContent(outputSprite, 'url(../img/sprite.png)');
                        assert.file(oaspGenTestUtils.resolvePathInTestDirectory('target-tmp/img/sprite.png'));
                    });
                    it('should inject sprite css file into main html', function () {
                        oaspGenTestUtils.assert.contaisStyle('target-tmp/index.html', 'css/sprite.css');
                    });
                });

                describe('index html', function () {
                    it('should contain bower libs', function () {
                        oaspGenTestUtils.assert.contaisScript('target-tmp/index.html', '../bower_components/angular/angular.js');
                        oaspGenTestUtils.assert.contaisScript('target-tmp/index.html', '../bower_components/jquery/dist/jquery.js');
                    });
                    it('should contain app sources in proper order', function () {
                        oaspGenTestUtils.assert.contaisScript('target-tmp/index.html', 'app.module.js');
                        oaspGenTestUtils.assert.contaisScript('target-tmp/index.html', 'main/main.templates.js');
                    });
                });

                describe('cached templates', function () {
                    it('should generate angular module with cached html templates', function () {
                        var cachedTemplatesModuleFile = oaspGenTestUtils.resolvePathInTestDirectory('target-tmp/main/main.templates.js');
                        assert.file(cachedTemplatesModuleFile);
                        assert.fileContent(cachedTemplatesModuleFile, /angular.module\("app.main.templates", \[\]\)/);
                        assert.fileContent(cachedTemplatesModuleFile, /main\/layout\/sample-dialog.html/);
                        assert.fileContent(cachedTemplatesModuleFile, /main\/layout\/sample-dialog2.html/);
                    });
                });
            });

            describe('build:dist', function () {
                var distDirectory = path.join(oaspGenTestUtils.testDirectory, 'target-dist');
                before(function (done) {
                    oaspGenTestUtils.runGulpAndCallDone(['clean'], function () {
                        oaspGenTestUtils.runGulpAndCallDone(['build:dist'], done);
                    });
                });

                describe('styles', function () {
                    it('should compile less file collecting code from whole app, allowing includes and propagating variables between modules', function () {
                        var outputLess = oaspGenTestUtils.queryAndResolveFileInTestDirectory('css/oasp-*.css', distDirectory);
                        assert.fileContent(outputLess, /\.class1/);
                        assert.fileContent(outputLess, /\.class2/);
                    });
                    it('should inject css file into main html', function () {
                        var outputLess = oaspGenTestUtils.queryFileInTestDirectory('css/oasp-*.css', distDirectory);
                        oaspGenTestUtils.assert.contaisStyle('target-dist/index.html', outputLess);
                    });
                });

                describe('sprites', function () {
                    it('should combine png files from sprite directory and generate associated css file and image', function () {
                        var outputSprite = oaspGenTestUtils.queryAndResolveFileInTestDirectory('css/oasp-*.css', distDirectory);
                        assert.fileContent(outputSprite, /\.icon-de-24/);
                        assert.fileContent(outputSprite, /\.icon-en-24/);
                        assert.fileContent(outputSprite, 'url(../img/sprite.png)');
                        assert.file(oaspGenTestUtils.resolvePathInTestDirectory('target-dist/img/sprite.png'));
                    });
                });

                describe('images', function () {
                    it('should copy non sprite images to target-dist', function () {
                        assert.file(oaspGenTestUtils.resolvePathInTestDirectory('target-dist/main/img/Koala.jpg'));
                        assert.noFile(oaspGenTestUtils.resolvePathInTestDirectory('target-dist/main/img/sprite/de-24.png'));
                        assert.noFile(oaspGenTestUtils.resolvePathInTestDirectory('target-dist/main/img/de-24.png'));
                    });
                });

                describe('index html', function () {
                    it('should contain concatenated vendor file', function () {
                        var outputVendor = oaspGenTestUtils.queryFileInTestDirectory('js/vendor-*.js', distDirectory);
                        oaspGenTestUtils.assert.contaisScript('target-dist/index.html', outputVendor);
                        oaspGenTestUtils.assert.noContaisScript('target-dist/index.html', 'bower_components/angular/angular.js');
                    });
                });

                describe('cached templates', function () {
                    it('should generate angular module with cached html templates and include it into main app js file', function () {
                        var appJsFile = oaspGenTestUtils.queryAndResolveFileInTestDirectory('target-dist/js/app-*.js');
                        assert.file(appJsFile);
                        assert.fileContent(appJsFile, /angular.module\("app.main.templates",\[\]\)/);
                        assert.fileContent(appJsFile, /main\/layout\/sample-dialog.html/);
                        assert.fileContent(appJsFile, /main\/layout\/sample-dialog2.html/);
                    });
                });

                describe('i18n', function () {
                    it('should copy internationalization files', function () {
                        assert.file(oaspGenTestUtils.resolvePathInTestDirectory('target-dist/main/i18n/locale-en.json'));
                        assert.file(oaspGenTestUtils.resolvePathInTestDirectory('target-dist/main/i18n/locale-de.json'));
                    });
                });

                describe('fonts', function () {
                    it('should copy fonts from bower files', function () {
                        assert.file(oaspGenTestUtils.resolvePathInTestDirectory('target-dist/fonts/glyphicons-halflings-regular.svg'));
                        assert.file(oaspGenTestUtils.resolvePathInTestDirectory('target-dist/fonts/glyphicons-halflings-regular.ttf'));
                        assert.file(oaspGenTestUtils.resolvePathInTestDirectory('target-dist/fonts/glyphicons-halflings-regular.eot'));
                        assert.file(oaspGenTestUtils.resolvePathInTestDirectory('target-dist/fonts/glyphicons-halflings-regular.woff'));
                    });
                });
            });
        });
    });
};
