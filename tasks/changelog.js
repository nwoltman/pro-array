'use strict';

var exec = require('child_process').exec;
var fs = require('fs');

module.exports = function(grunt) {
  grunt.registerTask('changelog', 'Add the changes since the last release to the changelog', function() {
    var done = this.async();

    var pkg = grunt.config.data.pkg;
    var repoUrl = pkg.repository.url;
    var command =
      'git --no-pager log v' + pkg.version + '... --pretty=format:"+ %s ([view](' + repoUrl + '/commit/%H))"';

    exec(command, function(error, stdout) {
      if (error) {
        grunt.log.error('There was an error reading the git log output.');
        grunt.fail.fatal(error);
      }

      var code = fs.readFileSync('pro-array.js', {encoding: 'utf8'});
      var curVersion = /@version (\d+\.\d+\.\d+)/.exec(code)[1];
      var date = new Date().toISOString().slice(0, 10);
      var versionHeader = '## ' + curVersion + ' (' + date + ')\n';
      var changelog = fs.readFileSync('CHANGELOG.md', {encoding: 'utf8'});

      if (changelog.indexOf(versionHeader, 13) >= 0) {
        grunt.log.error('Changelog already updated.');
        done();
        return;
      }

      var changes =
        stdout
          // Filter out messages that don't need to be in the changelog
          .replace(/^\+ (?:Update|Merge).*[\r\n]*/gm, '')
          // Generate links to the docs for mentioned functions
          .replace(/[#.](\w+)\(\)/g, '[`.$1()`](' + repoUrl + '#Array+$1)');

      changelog = '# CHANGELOG\n\n' +
                  versionHeader + changes + '\n' +
                  changelog.replace(/^# CHANGELOG\s+/, '\n'); // Remove the current header

      fs.writeFile('CHANGELOG.md', changelog, done);
      grunt.log.ok('Added changes to the changelog.');
    });
  });
};
