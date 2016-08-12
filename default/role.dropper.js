/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.dropper');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        if (!creep.memory.affinity) {
            creep.say("Where?");
            return;
        }
        var resource = Game.getObjectById(creep.memory.affinity);
        var loadOff = null;
        if (!creep.memory.loadOff) {
            loadOff = resource.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity;
                }
            });
            if (!loadOff) {
                creep.say("no loadoff");
                return;
            }
            if (loadOff) {
                creep.memory.loadOff = loadOff.id;
            }
        } else {
            loadOff = Game.getObjectById(creep.memory.loadOff);
        }
        if (creep.carry.energy == creep.carryCapacity) {
            var result;
            result = creep.transfer(loadOff, RESOURCE_ENERGY);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(loadOff);
            }
        }
        
        if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(resource);
        }
    }
};