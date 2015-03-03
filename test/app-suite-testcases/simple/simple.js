var expect = require('chai').expect;

module.exports = function () {
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
                it('should true be equal true', function () {
                    expect('bar').to.equal('bar');
                });
            }
        }
    };
};
