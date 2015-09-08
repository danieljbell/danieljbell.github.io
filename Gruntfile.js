module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      dist: '_site'
    },

    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/css/{,*/}*.css',
          '<%= config.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 2 versions', 'ie 8', 'ie 9']
        },
        files: {
          '_site/css/main.css': '_site/css/main.css'
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    }

  });

  grunt.registerTask('default', [
    'autoprefixer',
    'connect:livereload',
    'watch'
  ]);

};
