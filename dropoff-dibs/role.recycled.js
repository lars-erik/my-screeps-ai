module.exports = {
    run: function(creep) {
        if (creep.room.mainSpawn().recycleCreep(creep) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.mainSpawn());
        }
    }
}