let harvester = require("./roles.harvester");

module.exports = {
    execute(creep) {
        let mode = creep.memory.mode || "harvest";
        
        if (creep.carry.energy < creep.carryCapacity && mode === "harvest") {
            harvester.execute(creep);
        } else {
            mode = "upgrade";
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            if (creep.carry.energy === 0) {
                mode = "harvest";
            }
        }
        creep.memory.mode = mode;
    }
}