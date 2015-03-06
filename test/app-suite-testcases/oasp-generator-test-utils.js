var os = require('os'),
    path = require('path'),
    fs = require('fs-extra'),
    rm = require('rimraf'),
    bower = require('bower'),
    spawn = require('cross-spawn'),
    assert = require('chai').assert;

module.exports = exports = {
    testDirectory: path.join(os.tmpdir(), './temp-test'),

    deleteOldFilesAndCopyNewOnes: function (files, srcDirectory, destDirectory) {
        destDirectory = destDirectory || this.testDirectory;
        if (files) {
            files.forEach(function (file) {
                rm.sync(path.join(destDirectory, file));
            });
            //copy test case file into output
            files.forEach(function (file) {
                fs.copySync(path.join(srcDirectory, file), path.join(destDirectory, file));
            });
        }
    },

    runBowerInstallAndCallDone: function (done) {
        bower.commands.install().on('end', function () {
            done();
        });
    },

    runGulpAndCallDone: function (gulpGoals, done, destDirectory) {
        destDirectory = destDirectory || this.testDirectory;
        spawn('gulp', gulpGoals, {cwd: destDirectory})
            .on('close', function (code) {
                if (code !== 0) {
                    assert.fail('gulp exited with code ' + code);
                }
                done();
            });
    }
};
