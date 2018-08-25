var harvesting = require("harvesting");
var upgrading = require("role.upgrader");
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

        if (!creep.memory.building && !harvesting.harvestClosest(creep, true) && creep.carry.energy > 0)
            creep.memory.building = true;

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                var brokeRooms = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.hits < structure.hitsMax;
                    }
                })
                if (brokeRooms.length) {
                    if (creep.repair(brokeRooms[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(brokeRooms[0]);
                    }
                } else {
                    upgrading.run(creep);
                }
            }
	    }
	}
};

module.exports = roleBuilder;