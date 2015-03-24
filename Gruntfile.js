var open = require('open');

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            'default':{
                files: ['./app/less/**/*.less'],
                tasks: ['less:default'],
                options: {
                    livereload: {
                        port: 35745
                    }
                }
            }
        },

        less: {
            'default':{
                files:{
                    './app/css/<%= pkg.name %>.css': './app/less/<%= pkg.name %>.less'
                }
            },
            'default-min':{
                options: {
                    compress: true
                },
                files:{
                    './dist/<%= pkg.name %>.min.css':'./app/less/<%= pkg.name %>.less'
                }
            }
        },

        concat: {
            'default': {
                src: [
                    './app/scripts/**/*.js'
                ],
                dest: './dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            'default': {
                options: {
                    drop_console: true,
                    sourceMap: true,
                    maxLineLen: 1000
                },
                src: ['./dist/<%= pkg.name %>.js'],
                dest: './dist/<%= pkg.name %>.min.js'
            }
        },

        copy: {
            'default': {
                files: [{
                    expand: true,
                    dot: true,
                    cwd:'./app/css/',
                    src: ['<%= pkg.name %>.css'],
                    dest: './dist/'
                }]
            }
        },

        clean: {
            'default':['./dist/*']
        },

        compress: {
            'default': {
                options: {
                    archive: './dist/<%= pkg.name %>.zip'
                },
                files: [{   
                    expand: true,
                    dot: true,
                    cwd:'./app/css/',
                    src: ['<%= pkg.name %>.css'],
                    dest: '/'
                },
                {
                    expand: true,
                    dot: true,
                    cwd:'./dist/',
                    src: ['<%= pkg.name %>.js','<%= pkg.name %>.min.js'],
                    dest: '/'
                }]
            }
        },

        nodemon: {
            app: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['node_modules/**','vendors/**'],
                    ext: 'html',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname,
                    callback: function(nodemon) {
                        nodemon.on('config:update', function () {
                            open('http://localhost:3000');
                        });
                    }
                }
            }
        },

        concurrent: {
            app: {
                tasks: ['less:default','nodemon:app', 'watch:default'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent:app']);
    grunt.registerTask('build', [
        'clean:default',
        'less:default',
        'less:default-min',
        'concat:default',
        'copy:default',
        'uglify:default',
        'compress:default'
    ]);
};