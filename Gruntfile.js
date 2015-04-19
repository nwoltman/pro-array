module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jsonlint: {
      all: {
        src: ['*.json', '.jshintrc']
      }
    },

    jshint: {
      all: {
        src: ['*.js', 'test/*.js'],
        options: {
          jshintrc: true
        }
      }
    },

    mochaTest: {
      test: {
        src: ['test/**/*.js']
      }
    },

    jsdoc2md: {
      docs: {
        src: 'pro-array.js',
        dest: 'docs/Array.md'
      }
    }
  });

  // Load the Grunt plugins
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks("grunt-jsdoc-to-markdown");

  // Create a task that formats the generated documentation
  grunt.registerTask('format_docs', function() {
    var fs = require('fs');
    var doc = fs.readFileSync('docs/Array.md', {encoding: 'utf8'});
    doc = doc.replace(/\*{2}Kind\*{2}:.*\n/g, '');
    doc = doc.replace(/\s{4,}(?= [^|]+\|$)/gm, '');
    fs.writeFileSync('docs/Array.md', doc);
    grunt.log.ok('Formatted documentation.');
  });

  // Register tasks
  grunt.registerTask('lint', ['jsonlint', 'jshint']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('docs', ['jsdoc2md', 'format_docs']);
  grunt.registerTask('default', ['lint', 'test', 'docs']);
};