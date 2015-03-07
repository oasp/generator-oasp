var chai = require('chai'),
    assert = chai.assert,
    fs = require('fs'),
    path = require('path'),
    spawn = require('cross-spawn'),
    oaspGenTestUtils = require('../oasp-generator-test-utils');

module.exports = function () {
    chai.should();

    describe('simple', function () {
        before(function (done) {
            oaspGenTestUtils.deleteOldFilesAndCopyNewOnes(['app','config.json'], __dirname);
            oaspGenTestUtils.runBowerInstallAndCallDone(done);
        });
        describe('template', function () {
            describe('build:develop', function () {
                before(function (done) {
                    oaspGenTestUtils.runGulpAndCallDone(['build:develop'], done);
                });
                after(function (done) {
                    oaspGenTestUtils.runGulpAndCallDone(['clean'], done);
                });
                describe('styles', function () {
                    it('should compile less into one file', function (done) {
                        var outputLess = path.join(oaspGenTestUtils.testDirectory, '.tmp/css/oasp.css');
                        fs.existsSync(outputLess).should.eql(true);
                        var body = fs.readFileSync(outputLess, 'utf8');
                        (body.indexOf('.class1') > -1).should.eql(true);
                        (body.indexOf('.class2') > -1).should.eql(true);
                        done();
                    });
                });
            });
        });
    });
};
