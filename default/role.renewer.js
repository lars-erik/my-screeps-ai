module.exports = {
    run: function(creep) {
        creep.say("renewing");
        creep.memory.renewing = true;
        creep.transfer(creep.room.mainSpawn(), RESOURCE_ENERGY);
        if (creep.room.mainSpawn().renewCreep(creep) !== OK) {
            creep.say("go to renew");
            creep.moveTo(creep.room.mainSpawn());
        }
        if (creep.ticksToLive > 1400) {
            creep.memory.renewing = false;
        }
    }
}
