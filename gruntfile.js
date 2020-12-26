'use-strict';

const sass = require('node-sass');

module.exports = (grunt) => {
  grunt.initConfig({
    sass: {
      dev: {
        options: {
          implementation: sass,
        },
        files: {
          'public/assets/stylesheets/main.css':
            'public/assets/stylesheets/main.scss',
        },
      },
      prod: {
        options: {
          implementation: sass,
          noSourceMap: true,
          style: 'compressed',
        },
        files: {
          'dist/assets/stylesheets/main.min.css':
            'public/assets/stylesheets/main.scss',
        },
      },
    },
    eslint: {
      target: [
        'public/**/*.jsx',
        'public/assets/scripts/components/*.js',
        'public/assets/scripts/services/*.js',
        'public/assets/scripts/utils/*.js',
      ],
    },
    browserify: {
      dist: {
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
        files: {
          'public/assets/scripts/bundle.js': [
            'public/assets/scripts/components/*.jsx',
            'public/assets/scripts/components/index.js',
            'public/assets/scripts/services/*.js',
            'public/assets/scripts/utils/*.js',
          ],
        },
      },
    },
    uglify: {
      options: {
        compress: {
          drop_console: true,
        },
      },
      dist: {
        src: 'public/assets/scripts/bundle.js',
        dest: 'dist/assets/scripts/bundle.min.js',
      },
    },
    clean: {
      dist: ['dist'],
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: ['assets/fonts/**', 'assets/images/**'],
            dest: 'dist',
            filter: 'isFile',
          },
        ],
      },
    },
    'string-replace': {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: 'index.html',
            dest: 'dist/',
          },
        ],
        options: {
          replacements: [
            {
              pattern: /\.development\.js/gi,
              replacement: '.production.min.js',
            },
            {
              pattern: 'bundle.js',
              replacement: 'bundle.min.js',
            },
            {
              pattern: 'main.css',
              replacement: 'main.min.css',
            },
          ],
        },
      },
    },
    connect: {
      dist: {
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
        files: [
          'public/assets/scripts/**/*.jsx',
          'public/assets/scripts/components/*.js',
          'public/assets/scripts/services/*.js',
          'public/assets/scripts/utils/*.js',
        ],
        tasks: ['eslint', 'browserify'],
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass:dev'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'sass:dev',
    'eslint',
    'browserify',
    'connect',
    'watch',
  ]);
  grunt.registerTask('production', [
    'clean',
    'sass:prod',
    'eslint',
    'browserify',
    'uglify',
    'copy',
    'string-replace',
  ]);
  grunt.registerTask('lint', ['eslint']);
};
