let harvester = require("./roles.harvester");

module.exports = {
    execute(creep) {
        let mode = creep.memory.mode || "harvest";
        
        if (creep.carry.energy < creep.carryCapacity && mode === "harvest") {
            harvester.execute(creep);
        } else {
            mode = "upgrade";
            let upgrade = creep.room.find(FIND_STRUCTURES, {filter:{structureType:STRUCTURE_CONTROLLER}})[0];
            if (creep.upgradeController(upgrade) === ERR_NOT_IN_RANGE) {
                creep.moveTo(upgrade);
            }
            if (creep.carry.energy === 0) {
                mode = "harvest";
            }
        }
        creep.memory.mode = mode;
    }
}