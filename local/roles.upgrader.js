let harvester = require("./roles.harvester");
let builder = require("./roles.builder");

module.exports = {
    execute(creep) {
        let mode = creep.memory.mode || "harvest";
        
        let constructionCount = creep.room.find(FIND_MY_CONSTRUCTION_SITES).length;

        if (constructionCount > 0) {
            builder.execute(creep);
            return;
        }

        if (creep.carry.energy < creep.carryCapacity && mode === "harvest") {
            harvester.execute(creep);
        } else {
            mode = "upgrade";
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4444ff'}});
            }
            if (creep.carry.energy === 0) {
                mode = "harvest";
            }
        }
        creep.memory.mode = mode;
    }
}