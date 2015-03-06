var chai = require('chai');
chai.should();
var assert = chai.assert;
var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');

module.exports = function (output) {
    'use strict';
    return {
        basepath: __dirname,
        files: [
            'app',
            'config.json'
        ],
        describe: {
            message: 'simple',
            testcase: function () {
                describe('build:develop', function () {
                    before(function (done) {
                        spawn('gulp', ['build:develop'], {cwd: output})
                            .on('close', function (code) {
                                if (code !== 0) {
                                    assert.fail('gulp exited with code ' + code);
                                }
                                done();
                            });

                    });
                    after(function (done) {
                        spawn('gulp', ['clean'], {cwd: output})
                            .on('close', function (code) {
                                if (code !== 0) {
                                    assert.fail('gulp exited with code ' + code);
                                }
                                done();
                            });
                    });
                    describe('styles', function () {
                        it('should compile less into one file', function (done) {
                            var outputLess = path.join(output, '.tmp/css/oasp.css');
                            fs.existsSync(outputLess).should.eql(true);
                            var body = fs.readFileSync(outputLess, 'utf8');
                            (body.indexOf('.class1') > -1).should.eql(true);
                            (body.indexOf('.class2') > -1).should.eql(true);
                            done();
                        });
                    });
                });
            }
        }
    };
};
