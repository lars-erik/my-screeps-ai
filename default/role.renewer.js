module.exports = {
    function run(creep) {
        if (creep.room.mainSpawn().renewCreep(creep) !== OK) {
            creep.moveTo(creep.room.mainSpawn());
        }
    }
}
