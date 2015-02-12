'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Oasp:module', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../module'))
      .withArguments('mmm')
      .withOptions({ 'skip-install': true })
      .on('ready', function (generator) {
        generator.config.set('appPath', 'app');
        generator.config.set('appModule', 'app');
        generator.config.save();
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/mmm/mmm.module.js',
      'app/mmm/css/mmm.less'
    ]);
  });
});
