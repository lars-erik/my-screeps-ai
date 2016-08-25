var upgrading = require("role.upgrader"),
    levels = {};
    
function switchMode(creep) {
    if(creep.memory.building && creep.isEmpty()) {
        creep.memory.building = false;
        creep.say('harvesting');
    }
    if(!creep.memory.building && creep.isFull()) {
        creep.memory.building = true;
        creep.say('building');
    }
}

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var prioritizedSite = creep.affinity("buildAffinity") || creep.room.find(FIND_CONSTRUCTION_SITES)[0],
            groupMemory = Memory.groups[creep.memory.group] || {},
            prioritizedRoom = groupMemory.room || creep.memory.room || creep.room.name,
            repairRoad,
            affinity = creep.affinity(),
            debugged = creep.name == "W58S48 Builder 3";

        switchMode(creep);
        
        if (creep.room.name !== prioritizedRoom) {
            if (!creep.isFull() && affinity.room === creep.room) {
                creep.pickupClosestEnergy(affinity);
            } else {
                creep.moveTo(new RoomPosition(24, 24, prioritizedRoom));
            }
        } else if (!prioritizedSite) {
            repairRoad = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: function(s) { return s instanceof StructureRoad && s.hits < s.hitsMax; } });
            if (repairRoad && !creep.isEmpty()) {
                if (creep.repair(repairRoad) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairRoad);
                }
            } else {
                upgrading.run(creep);
            }
        } else if (creep.memory.building) {
            creep.moveByResult(creep.build(prioritizedSite), prioritizedSite);
        } else {
            if (affinity && (affinity.room !== creep.room || creep.pos.y === 0 || creep.pos.x === 0 || creep.pos.y === 49 || creep.pos.x === 49)) {
                creep.moveTo(affinity);
            } else if (!creep.pickupClosestEnergy(prioritizedSite)) {
                creep.harvestClosestSource(prioritizedSite.closestSource(), prioritizedSite);
            }
        }
    }
};

