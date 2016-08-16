module.exports = {
    run: function(creep) {
        creep.say("renewing");
        if (creep.room.mainSpawn().renewCreep(creep) !== OK) {
            creep.say("go to renew");
            creep.moveTo(creep.room.mainSpawn());
        }
    }
}
