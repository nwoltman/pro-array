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
          helper: ['jsdoc2md/helpers.js'],
          partial: [
            'jsdoc2md/partials/body.hbs',
            'jsdoc2md/partials/examples.hbs',
            'jsdoc2md/partials/link.hbs',
            'jsdoc2md/partials/linked-type-list.hbs',
            'jsdoc2md/partials/params-table.hbs',
            'jsdoc2md/partials/param-table-name.hbs'
          ],
          separators: true,
          'sort-by': ['name'],
          template: require('fs').readFileSync('jsdoc2md/README.hbs', {encoding: 'utf8'})
        },
        src: 'pro-array.js',
        dest: 'README.md'
      }
    }
  });

  // Load the Grunt plugins
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');

  // Register tasks
  grunt.registerTask('lint', ['jsonlint', 'jshint']);
  grunt.registerTask('test', ['mochacov:test'].concat(process.env.CI ? ['mochacov:test_coverage'] : []));
  grunt.registerTask('coverage', ['mochacov:coverage']);
  grunt.registerTask('docs', ['jsdoc2md']);
  grunt.registerTask('default', ['lint', 'test', 'docs']);
};
