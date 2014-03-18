module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // defining project name
    // please replace all "project_name" with your own project name
    project_name: {
        js: ['src/js/app.js', 'build/js/app.*.js'],
        scss: ['src/scss/style.scss']
    },


    // sass config
    // by default, you're using libsass (C compiler)
    // you can switch to grunt-contrib-sass (Ruby compiler) but you need some adjustment on the config below
    // please refer to this : https://github.com/gruntjs/grunt-contrib-sass
    sass: {
      dist: {
        options: {
          includePaths: ['bower_components/anila/scss']
        },
        files: {
          'src/css/style.css': 'src/scss/style.scss'
        }
      },
      compressed: {
        options: {
          outputStyle: 'compressed',
          loadPath: ['build/scss']
        },
        files: {
          'dist/assets/css/style.min.css': '<%= project_name.scss %>'
        }
      }
    },


    // uglify config
    // see : https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      dist: {
        files: {
          'src/js/min/app.min.js': ['<%= project_name.js %>']
        }
      }
    },


    // clean config
    // see : https://github.com/gruntjs/grunt-contrib-clean
    clean: ['dist/'],


    // copy config
    // see : https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      dist: {
        files: [{
            cwd: 'src/',
            expand: true,
            src: 'img/**/*',
            dest: 'dist/img/'
          }, {
            cwd: 'src/',
            expand: true,
            src: 'view/*.{html, php, txt, md}',
            dest: 'dist/view/'
          }, {
            cwd: 'src/',
            expand: true,
            src: 'css/*',
            dest: 'dist/css/'
          }
        }]
      }
    },


    // watch config
    // see : https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      view: {
        files: 'src/view',
        tasks: ['copy'],
        options: {
          livereload : true
        }
      },
      js: {
        files: 'src/js/*.js',
        tasks: ['uglify'],
        filter: 'isFile',
        options: {
          livereload: true
        }
      },
      js_min: {
        file: 'src/js/min',
        tasks: ['copy'],
        filter: 'isFile',
        options: {
          livereload: true
        }
      },
      images: {
        files: 'src/img/*',
        tasks: ['copy']
        options: {
          livereload: true
        }
      }
    },


    // compress config
    //see : https://github.com/gruntjs/grunt-contrib-compress
    compress: {
      dist: {
        options: {
          archive: 'archive/anila.tar.gz'
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: '/'
        }]
      }
    }


  });

  // using SASS Ruby compiler?
  grunt.loadNpmTasks('grunt-sass');
  // using SASSC compiler?
  //grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('build:dev', ['clean', 'sass:dist', 'uglify', 'copy']);
  grunt.registerTask('build:production', ['clean', 'sass', 'uglify', 'copy', 'compress']);
  grunt.registerTask('default', ['build:dev','watch']);
}