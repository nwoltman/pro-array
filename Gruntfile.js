/* eslint-disable comma-dangle */

'use strict';

var fs = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jsonlint: {
      all: '*.json',
    },

    eslint: {
      all: ['*.js', '@(tasks|test)/*.js'],
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
      testAndCoverage: {
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
          partial: [
            'jsdoc2md/partials/body.hbs',
            'jsdoc2md/partials/examples.hbs',
            'jsdoc2md/partials/link.hbs',
            'jsdoc2md/partials/linked-type-list.hbs',
            'jsdoc2md/partials/params-table.hbs',
            'jsdoc2md/partials/param-table-name.hbs',
            'jsdoc2md/partials/separator.hbs'
          ],
          separators: true,
          'sort-by': ['name'],
          template: fs.readFileSync('jsdoc2md/README.hbs', {encoding: 'utf8'})
        },
        src: 'pro-array.js',
        dest: 'README.md'
      }
    }
  });

  // Load the Grunt plugins
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');

  // Load custom tasks
  grunt.loadTasks('tasks');

  // Register tasks
  grunt.registerTask('lint', ['jsonlint', 'eslint']);
  grunt.registerTask('test', ['mochacov:test'].concat(process.env.CI ? ['mochacov:testAndCoverage'] : []));
  grunt.registerTask('coverage', ['mochacov:coverage']);
  grunt.registerTask('docs', ['jsdoc2md', 'fixdocs']);
  grunt.registerTask('default', ['lint', 'test', 'docs']);
};
