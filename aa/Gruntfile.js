/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
m.360guanai.com这个应用的Gruntfile.js，如果要对这个app进行前端发布，请将这个文件重命名为Gruntfile.js后覆盖到static.joyouschina.com下，再执行grunt命令
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
module.exports = function(grunt) {
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     配置任务目标
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    grunt.initConfig({
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        读取package.json信息
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        pkg: grunt.file.readJSON("package.json"),
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        合并js和css
        @合并 jquery-1.11.3.js, jquery.scrollup.js ,jquery.lazyload.js， jquery.cookie.js以及当前应用的基类为app.js
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        concat: {
            options: {

            },
            dist: {
                src: ["guanaihui/js/lib/jQuery/jquery-1.11.3.js", "bootstrap/3.3.4/js/bootstrap.js", "guanaihui/js/util/jquery.cookie.min.js", "apps/m.360guanai.com/jssrc/controller.js"],
                dest: "apps/m.360guanai.com/jssrc/app.js"
            }
        },
        /*-------------------------------------------   ----------------------------------------------------------------------------------------------------------------------------
        压缩js
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        uglify: {
            build: {
                src: "apps/m.360guanai.com/jssrc/app.js",
                dest: "apps/m.360guanai.com/js/app.min.js"
            }
        },
        /*-------------------------------------------   ----------------------------------------------------------------------------------------------------------------------------
        将less自动编译成css
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        less: {
            all: {
                options: {
                    compress: true,
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    expand: true,
                    cwd: 'apps/m.360guanai.com/',
                    src: ['!less/home/district.less', '!less/normalize.less',
                        '!less/placeholder.less', '!less/reset.less',
                        '!less/variables.less', '!less/variablesMember.less',
                        '!less/product/supportStore.less'
                    ],
                    dest: 'apps/m.360guanai.com/css/',
                    ext: '.min.css',
                    rename: function(dest, src) {
                        return dest + src.replace('less/', '')
                    }
                }
            },
            one: {
                options: {
                    compress: true,
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    // "apps/m.360guanai.com/css/account/login.min.css":"apps/m.360guanai.com/less/account/login.less"
                }
            }
        },

        watch: {
            less: {
                files: ['apps/m.360guanai.com/less/**/*.less'],
                tasks: ['less:main'],
                options: {
                    livereload: false
                }
            }
        }
    });
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     加载grunt插件
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');


    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     注册并执行任务
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    grunt.registerTask("default", ["concat", "uglify:build"]);

    grunt.registerTask('lessc', ['less:one']);
    grunt.registerTask('wless', ['watch'], function() {
        grunt.log.writeln("watch task is running");
        //grunt.task.run('wless');
    });

    grunt.registerTask('lessone', 'Build One less file', function(dirName, fileName) {
        var lessPath = "apps/m.360guanai.com/less/" + dirName + "/" + fileName + ".less";
        var cssPath = "apps/m.360guanai.com/css/" + dirName + "/" + fileName + ".min.css";
        var obj = {};

        obj[cssPath] = lessPath;
        grunt.config.set('less.one.files', obj);

        //执行编译less的任务
        grunt.task.run("less:one");
    });
};
