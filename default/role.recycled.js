module.exports = {
    run: function (creep) {
        var mainSpawn = creep.room.mainSpawn(),
            result;
        if (mainSpawn) {
            result = mainSpawn.recycleCreep(creep);
            if (result != OK) {
                creep.moveTo(creep.room.mainSpawn());
            }
        }
    }
}