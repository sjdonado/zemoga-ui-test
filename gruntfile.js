'use-strict';

const sass = require('node-sass');

module.exports = (grunt) => {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8080,
          open : true,
          base: 'public',
          livereload: true,
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['public/index.html'],
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
      },
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          'public/assets/stylesheets/main.css': 'public/assets/stylesheets/main.scss'
        }
      }
    },
  });
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
   
  grunt.registerTask('default', ['sass', 'connect', 'watch']);
}
 