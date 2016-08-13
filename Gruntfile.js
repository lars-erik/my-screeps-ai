module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        copy: {
            game: {
                files: [
                    { expand: true, src: ["C:/Users/Lars-Erik/AppData/Local/Screeps/scripts/screeps.com/default/*"], flatten: true, dest: "default" }
                ]
            }
        },
        watch: {
            fromGame: {
                files: ["C:/Users/Lars-Erik/AppData/Local/Screeps/scripts/screeps.com/default/*"],
                tasks: ["copy:game"]
            }
        }
    });


};