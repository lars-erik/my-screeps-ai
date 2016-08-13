var harvesting = require("harvesting"),
    building = require("role.builder"),
    levels = {};

function shouldTransfer(creep) {
    return creep.isFull() && !creep.room.isFull();
}

levels[1] = function (creep) {

    var room = creep.room,
        dropOff = creep.closestDropOff() || room.mainSpawn(),
        selectedSource = creep.affinity() || dropOff.closestSource(),
        isAtCapacity = room.isFull(),
        result
        ;
    
    if (isAtCapacity) {
        building.run(creep);  
    } else if (!creep.isFull()) {
        result = creep.harvest(selectedSource);
        creep.moveByResult(result, selectedSource, dropOff, shouldTransfer);
    } else {
        result = creep.transfer(dropOff, RESOURCE_ENERGY);
        creep.moveByResult(result, dropOff, selectedSource);
    }
}

module.exports = {
    run: function(creep) {
        if (!creep.memory.level) {
            noLevel(creep);
        } else {
            levels[creep.memory.level](creep);
        }
	}
};


/* OBSOLETE */

function noLevel(creep) {
    var doRepair = false;
    if(creep.carry.energy < creep.carryCapacity) {
        var containers = creep.room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER });
        if (containers.length) {
            doRepairs = !harvesting.harvestClosest(creep, true);
        } else {
            doRepairs = !harvesting.harvestClosest(creep);
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

