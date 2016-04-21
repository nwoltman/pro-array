/* eslint-disable camelcase, global-require */

'use strict';

module.exports = function(grunt) {
  require('jit-grunt')(grunt, {
    jsdoc2md: 'grunt-jsdoc-to-markdown',
  })({
    customTasksDir: 'tasks',
  });

  grunt.initConfig({
    eslint: {
      all: ['*.js', '@(tasks|test)/*.js'],
    },

    mochaTest: {
      test: {
        src: 'test/*.js',
      },
      options: {
        colors: true,
      },
    },

    mocha_istanbul: {
      coverage: {
        src: 'test/*.js',
        options: {
          reportFormats: ['html'],
        },
      },
      coveralls: {
        src: 'test/*.js',
        options: {
          coverage: true,
          reportFormats: ['lcovonly'],
        },
      },
      options: {
        mochaOptions: ['--colors'],
      },
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
            'jsdoc2md/partials/separator.hbs',
          ],
          separators: true,
          'sort-by': ['name'],
          template: require('fs').readFileSync('jsdoc2md/README.hbs', 'utf8'),
        },
        src: 'pro-array.js',
        dest: 'README.md',
      },
    },
  });

  grunt.event.on('coverage', function(lcov, done) {
    require('coveralls').handleInput(lcov, done);
  });

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', [process.env.CI ? 'mocha_istanbul:coveralls' : 'mochaTest']);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
  grunt.registerTask('docs', ['jsdoc2md', 'fixdocs']);
  grunt.registerTask('default', ['lint', 'test', 'docs']);
};
