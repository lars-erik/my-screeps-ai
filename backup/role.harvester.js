var harvesting = require("harvesting"),
    building = require("role.builder");

function dropOffTarget(creep, allowStorage) {
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
    if (!target && allowStorage) {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity;
            }
        });
    }
    return target;
}

function dropOff(creep, allowStorage) {
    var target = dropOffTarget(creep, allowStorage);

    if(target) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
            return true;
        }
    }
    
    return false;
}

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var doRepair = false,
            moved = false;
        if (creep.carry.energy == creep.carryCapacity) {
            moved = dropOff(creep);
        }
        
	    if(!moved && creep.carry.energy < creep.carryCapacity) {
	        from = creep.room.energyAvailable < creep.room.energyCapacityAvailable ? creep : Game.spawns.Spawn;
            var containers = creep.room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 0 });
            if (containers.length) {
                doRepairs = !harvesting.harvestClosest(creep, true, from);
            } else {
                doRepairs = !harvesting.harvestClosest(creep, false, from);
            }
        }
        
        if (creep.carry.energy > 0) {
            doRepair = !dropOff(creep, false);
        }
        
        if (doRepair && creep.carry.energy > 0) {
            building.run(creep);
            /*
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
            */
        }
    }
};

module.exports = roleHarvester;