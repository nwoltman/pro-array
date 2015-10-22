'use strict';

var fs = require('fs');
var os = require('os');

module.exports = function(grunt) {
  grunt.registerTask('fixdocs', 'Standardizes the newlines in the produced documentation', function() {
    var docs = fs.readFileSync('README.md', {encoding: 'utf8'}).replace(/\r\n|\r|\n/g, os.EOL);
    fs.writeFileSync('README.md', docs);
    grunt.log.ok('Fixed docs');
  });
};
