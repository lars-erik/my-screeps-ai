module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {expand: true, src:["default/*"], flatten: true, dest: "C:/Users/Lars-Erik/AppData/Local/Screeps/scripts/screeps.com/Sim 2"}
                ]
            }
        },
        watch: {
            files: ["default/*"],
            tasks: ["copy"]
        }
    });


};