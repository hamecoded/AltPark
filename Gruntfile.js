/**
 * sample Gruntfiles:
 * https://github.com/melonjs/melonJS
 * https://github.com/cabaret/grunt-starter/blob/master/Gruntfile.js
 */
module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

/////////////////////////////////////////////////////////////////////////////////////////////////
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        // Variables
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
                ' Licensed <%= pkg.license %> */\n',

        // Tasks
        clean: {
            options:{
                force: true
            },
            dist: ['dist', 'tmp'],
            tmp: ['tmp'],
            all: [
                'tmp',
                'dist',
                '.sass-cache',
                'node_modules',
                'public/bower_components'
            ]
        },

        // Run predefined tasks whenever watched file patterns are added, changed or deleted.
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            options: { 
                // https://github.com/gruntjs/grunt-contrib-watch
                livereload: true,
                atBegin: true //This option will trigger the run of each specified task at startup of the watcher. 
            },
            //watch for sass files changing ; recompile them ; and reload browser
            compass: {
                files: ['public/scss/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            //watch for changes in pre-index.html ; recompile index.html ; and refresh browser page
            preindex: {
                files: ['public/pre-index.html'],
                tasks: ['preprocess:dev','replace:dev']
            }
        },

        //compile sass to css
       compass: {  
            dist: {                  
              options: {              
                sassDir: 'public/scss',
                cssDir: 'tmp/css',
                environment: 'production'
              }
            },
            dev: {                    
              options: {
                sassDir: 'public/scss',
                cssDir: 'public/css',
                sourcemap: true
              }
            }
        },

        cssmin: {
          add_banner: {
            options: {
              banner: '<%= banner %>',
              stripBanners: true
            },
            files: {
              'tmp/css/<%= pkg.name %>.min.css': ['tmp/css/main.css']
            }
          }
        },

        //unused
        htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true,
                removeOptionalTags:true,
              },
              files: {                                   // Dictionary of files
                'dist/index.html': 'dist/index.html'     // 'destination': 'source'
              }
            },
            dev: {                                       // Another target
              files: {
                'public/index.html': 'public/pre-index.html'
              }
            }
        },

        // modifies files using anotations of exclude and ifs
        // in this gruntfile the functionality of variable replacing was achieved using the replace module instead
        preprocess:{
            options:{
                inline: true,
                context : {
                    DEBUG: true
                }
            },
            dist:{
                src: 'tmp/replaced-index.html',
                dest:'dist/index.html',
                options:{
                    context : {
                        DEBUG: false
                    }
                }
            },
            dev:{
                src: 'public/pre-index.html',
                dest:'public/index.html'
            }
        },

        //grunt clean:dist | grunt requirejs:compile
        requirejs: {
          compile: {
            options: {
                baseUrl: 'public',
                name: 'js/app',
                findNestedDependencies: true,  //truncates to output file all dependecies that are parsed so that you don't need to include them seperatly
                out: 'tmp/<%= pkg.name %>.js',
                mainConfigFile: 'public/js/require.config.js'
            }
          }
        },

        replace : {
            options : {
                patterns : [
                    {
                        match : /this\._super\(\s*([\w\.]+)\s*,\s*"(\w+)"\s*(,\s*)?/g,
                        replacement : "$1.prototype.$2.apply(this$3"
                    },
                    {
                        match: 'timestamp',
                        replacement: '<%= new Date().getTime() %>'
                    }
                ],
                prefix : "@",
                force : true
            },

            dist : {
                options : {
                    variables : {
                        'VERSION' : '<%= pkg.version %>',
                        'APP_NAME' : '<%= pkg.name %>.min'
                    },
                },
                files : [
                    {
                        expand : true,
                        flatten : true,
                        src : [ '<%= requirejs.compile.options.out %>' ],
                        dest : 'tmp/replaced/'
                    },
                    { src: ['public/pre-index.html'], dest: 'tmp/replaced-index.html'}
                ]
            },
            dev : {
                options : {
                    variables : {
                        'VERSION' : '<%= pkg.version %>',
                        'APP_NAME' : 'app'
                    },
                },
                files : [
                    {
                        src : [ '<%= preprocess.dev.dest %>' ],
                        dest : '<%= preprocess.dev.dest %>'
                    }
                ]
            }
        },

        uglify : {
            options : {
                report : 'min',
                preserveComments : 'some',
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist : {
                files : {
                    'dist/js/<%= pkg.name %>.min.js' : ['tmp/replaced/<%= pkg.name %>.js']
                }
            }
        },

        jshint : {
            options : {
                jshintrc : '.jshintrc'
            },

            dist : {
                files : {
                    src : [ 'public/js' ]
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'public/', src: ['img/**'], dest: 'dist/'},
                    {expand: true, cwd: 'public/bower_components', src: ['**'], dest: 'dist/bower_components'},
                   // {expand: true, cwd: 'public/templates', src: ['**'], dest: 'dist/templates'},
                    {expand: true, cwd: 'tmp/css/', src: ['<%= pkg.name %>.min.css'], dest: 'dist/css'}
                ]
            },
            preindex: {
                src: 'pre-index.html',
                dest: 'index.html'
            }
        }

    });

/////////////////////////////////////////////////////////////////////////////////////////////////

    grunt.registerTask('default', [
        'watch' // preprocess html and reload page
                // compass watch sass files and livereload
    ]);
    grunt.registerTask('build', [ 
        'clean:dist',    //delete directories: tmp, dist
        'compass:dist',  //compile sass to tmp dir
        'cssmin',        //minify + add banner + copy to dist dir
        'jshint:dist',   //jsHint js source files under public/js
        'requirejs',     //compile to tmp dir a single js file according to require config
        'replace:dist',  //replace in html file, variables with values, eg: appName and version + cacheBust and copy to tmp dir
        'preprocess:dist', //preprocess html ifs according to annotations and copy to dist dir
        'uglify',       // uglify and add banner to the js file generated in tmp by require
        'copy:dist',    // copy to dist dir: public/img and tmp/css dir
        'clean:tmp'     // delete tmp dir
    ]);
    grunt.registerTask('hard-reset', ['clean:all']);

};