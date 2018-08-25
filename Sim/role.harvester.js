var harvesting = require("harvesting"),
    building = require("role.builder");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var doRepair = false;
	    if(creep.carry.energy < creep.carryCapacity) {
            if (!harvesting.harvestClosest(creep)) {
                doRepairs = !harvesting.harvestClosest(creep, true);
            }
        }
        else {
            var target = null;
            if (!target) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    }
                });
            }
            if (!target) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                        }
                });
            }
            if (!target) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity;
                        }
                    });
            }

            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                doRepair = true;
            }
        }
        if (doRepair && creep.carry.energy > 0) {
            var brokeRoom = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < structure.hitsMax;
                }
            })
            if (brokeRoom && creep.repair(brokeRoom) == ERR_NOT_IN_RANGE) {
                creep.moveTo(brokeRoom);
            } else {
                building.run(creep);
            }
        }
	}
};

module.exports = roleHarvester;