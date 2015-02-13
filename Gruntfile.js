module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // defining project name
    // please replace all "project_name" with your own project name
    project_name: {
        js: ['build/js/apps/app.js', 'build/js/apps/app.*.js'],
        scss: ['build/sass/style.scss']
    },


    // sass config
    // by default, you're using libsass (C compiler)
    // you can switch to grunt-contrib-sass (Ruby compiler) but you need some adjustment on the config below
    // please refer to this : https://github.com/gruntjs/grunt-contrib-sass
    sass: {
      dist: {
        options: {
          includePaths: ['bower_components/anila/build/sass']
        },
        files: {
          'build/css/style.css': 'build/sass/style.scss'
        }
      },
      compressed: {
        options: {
          includePaths: ['bower_components/anila/build/sass'],
          outputStyle: 'compressed',
          loadPath: ['build/sass']
        },
        files: {
          'dist/css/style.min.css': '<%= project_name.scss %>'
        }
      }
    },


    // uglify config
    // see : https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      dist: {
        files: {
          'build/js/min/app.min.js': ['<%= project_name.js %>']
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
        files:
        [
          {
            cwd: 'build/',
            expand: true,
            src: ['img/**/*'],
            dest: 'dist/img/'
          }, {
            cwd: 'build/',
            expand: true,
            src: ['view/*.{html, php, txt, md}'],
            dest: 'dist/'
          }, {
            cwd: 'build/',
            expand: true,
            src: ['view/human.txt'],
            dest: 'dist/'
          }, {
            cwd: 'build/',
            expand: true,
            src: ['css/*'],
            dest: 'dist/'
          }, {
            cwd: 'build/js/min',
            expand: true,
            src: ['*'],
            dest: 'dist/js/'            
          }
        ]
      }
    },



    // watch config
    // see : https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'build/scss/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      view: {
        files: 'build/view',
        tasks: ['copy'],
        options: {
          livereload : true
        }
      },
      js: {
        files: 'build/js/apps/*.js',
        tasks: ['uglify'],
        filter: 'isFile'
      },
      js_min: {
        files: 'build/js/min/*.js',
        tasks: ['copy'],
        filter: 'isFile',
        options: {
          livereload: true
        }
      },
      images: {
        files: 'build/img/*',
        tasks: ['copy'],
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
          archive: 'archive/project_name.tar.gz'
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

  grunt.registerTask('build', ['clean', 'sass', 'uglify', 'copy']);
  grunt.registerTask('build:production', ['clean', 'sass', 'uglify', 'copy', 'compress']);
  grunt.registerTask('default', ['build:dev','watch']);
}