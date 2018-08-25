/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvesting');
 * mod.thing == 'a thing'; // true
 */
module.exports = {
    harvestClosest: function(creep, allowContainer) {
        
        var target,
            harvest = true;
        if (creep.memory.affinity) {
            target = Game.getObjectById(creep.memory.affinity);
        } else {
            var closestSource = creep.pos.findClosestByPath(FIND_SOURCES, {filter: (source) => source.energy > 0});
            if (allowContainer) {
                var closestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (source) => source.structureType == STRUCTURE_CONTAINER && source.store.energy > 0});
                if (closestContainer != null) {
                    target = closestContainer;
                } else {
                    target = closestSource;
                }
            } else {
                target = closestSource;
            }
        }

        if(target) {
            if (target instanceof Source) {
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else if (target instanceof StructureContainer) {
                var withdrawResult;
                withdrawResult = creep.withdraw(target, RESOURCE_ENERGY);
                if (withdrawResult == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            return true;
        } else {
            if (!target) {
                return false;
            }
            creep.memory.affinity = null;
            if (creep.carry.energy > 0 && creep.carry.energy % 15 == 0) {
                creep.say("Got " + creep.carry.energy);
            }
        }
    }
};