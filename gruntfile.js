'use-strict';

const sass = require('node-sass');

module.exports = (grunt) => {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8080,
          open: true,
          base: 'public',
          livereload: true,
        },
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['public/index.html'],
      },
      js: {
        files: '**/*.jsx',
        tasks: ['browserify'],
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
      },
    },
    browserify: {
      options: {
        transform: [
          [
            'babelify',
            {
              sourceMap: true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-modules-commonjs'],
            },
          ],
        ],
      },
      dist: {
        files: {
          'public/assets/scripts/components/bundle.js': [
            'public/assets/scripts/components/*.jsx',
          ],
        },
      },
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      dist: {
        files: {
          'public/assets/stylesheets/main.css':
            'public/assets/stylesheets/main.scss',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'browserify', 'connect', 'watch']);
};
