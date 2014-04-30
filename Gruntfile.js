module.exports = function(grunt) {
  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  // configure the tasks
  grunt.initConfig({
 
    copy: {
      build: {
        cwd: 'src',
        src: [ '**' ],
        dest: 'tmp',
        expand: true
      },
    },
    clean: {
      build: {
        src: [ 'tmp', 'releases' ]
      },
      cache: {
        src: [ 'cache' ]
      },
    },
    nodewebkit: {
      build: {
        options: {
            build_dir: '.',
            mac: true, 
            win: false, 
            linux32: false, 
            linux64: false 
        },
        src: ['tmp/**/*'] 
      }
    },
    shell: {
      setup: {
        command: 'npm install',
        options: {
          execOptions: {
            cwd: 'src'
          }
        }
      }
    }
  });
 

  // define the tasks

  grunt.registerTask(
    'build', 
    'Build the app to the build/ output folder.', 
    [ 'clean:build', 'copy:build', 'nodewebkit:build' ]
  );

  grunt.registerTask(
    'setup',
    'Setup the development environment.',
    ['shell:setup']
  );

};
