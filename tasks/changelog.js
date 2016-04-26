'use strict';

var execSync = require('child_process').execSync;
var fs = require('fs');
var pkg = require('../package');
var semver = require('semver');

module.exports = function(grunt) {
  grunt.registerTask('changelog', 'Add the changes since the last release to the changelog', function(releaseType) {
    var curVersion = pkg.version;
    var nextVersion = semver.inc(curVersion, releaseType);
    if (!nextVersion) {
      grunt.fail.fatal('Invalid release type: ' + releaseType);
    }

    var repoUrl = pkg.repository.url;
    var getCommitLogCommand =
      'git --no-pager log v' + curVersion + '... --pretty=format:"+ %s ([%h](' + repoUrl + '/commit/%H))"';
    var changes = execSync(getCommitLogCommand).toString()
      .replace(/^\+ Merge.*[\r\n]*/gm, '') // Filter out merge commits
      .replace(/[#.](\w+)\(\)/g, '[`.$1()`](' + repoUrl + '#Array+$1)'); // Link to docs for mentioned methods
    var date = new Date().toISOString().slice(0, 10);
    var versionHeader = '## ' + nextVersion + ' (' + date + ')\n';

    var changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
    if (changelog.indexOf(versionHeader, 13) >= 0) {
      grunt.log.warn('Changelog already updated.');
      return;
    }
    changelog = '# CHANGELOG\n\n' +
                versionHeader + changes + '\n' +
                changelog.replace(/^# CHANGELOG\s+/, '\n');

    fs.writeFileSync('CHANGELOG.md', changelog);
    grunt.log.ok('Added changes to the changelog.');
  });
};
