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

    mochacov: {
      test: {
        options: {
          reporter: 'spec'
        }
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          output: 'coverage/coverage.html'
        }
      },
      test_coverage: {
        options: {
          coveralls: true
        }
      },
      options: {
        files: 'test/*.js'
      }
    },

    jsdoc2md: {
      docs: {
        options: {
          partial: ['jsdoc2md/partials/body.hbs'],
          'sort-by': 'name'
        },
        src: 'pro-array.js',
        dest: 'docs/Array.md'
      }
    }
  });

  // Load the Grunt plugins
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks("grunt-jsdoc-to-markdown");

  // Create a task that formats the generated documentation
  // This will be unnecessary when https://github.com/jsdoc2md/ddata/pull/1 gets merged
  grunt.registerTask('format_docs', function() {
    var fs = require('fs');
    var doc = fs.readFileSync('docs/Array.md', {encoding: 'utf8'});
    doc = doc.replace(/\s{4,}(?= [^|]+\|$)/gm, '');
    fs.writeFileSync('docs/Array.md', doc);
    grunt.log.ok('Formatted documentation.');
  });

  // Register tasks
  grunt.registerTask('lint', ['jsonlint', 'jshint']);
  grunt.registerTask('test', ['mochacov:test'].concat(process.env.CI ? ['mochacov:test_coverage'] : []));
  grunt.registerTask('coverage', ['mochacov:coverage']);
  grunt.registerTask('docs', ['jsdoc2md', 'format_docs']);
  grunt.registerTask('default', ['lint', 'test', 'docs']);
};
