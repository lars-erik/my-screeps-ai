/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvesting');
 * mod.thing == 'a thing'; // true
 */
module.exports = {
    harvestClosest: function(creep, allowContainer, from) {
        
        var target,
            harvest = true,
            affinity = creep.room.memory.affinities[creep.memory.role] || creep.memory.affinity;
        if (affinity) {
            target = Game.getObjectById(affinity);
        } else {
            from = from || creep;
            //console.log(creep.name + "(" + creep.id + ")" + " finding path from " + from.id);
            var closestSource = from.pos.findClosestByPath(FIND_SOURCES, {filter: (source) => source.energy > 0});
            if (allowContainer) {
                var closestContainer = from.pos.findClosestByRange(FIND_STRUCTURES, {filter: (source) => source.structureType == STRUCTURE_CONTAINER && source.store.energy > 0});
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
                    creep.say("doh " + target.id);
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