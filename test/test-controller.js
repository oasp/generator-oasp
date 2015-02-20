'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('oasp:controller', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../controller'))
      .withArguments(['mmm','new-cnt'])
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
      'app/mmm/js/new-cnt.controller.js',
      'app/mmm/js/new-cnt.controller.spec.js'
    ]);
  });
});
