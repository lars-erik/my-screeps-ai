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

function repairRoad(creep) {
    var roadToRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: function (s) { return s instanceof StructureRoad && s.hits < s.hitsMax; } });
    if (roadToRepair && !creep.isEmpty()) {
        if (creep.repair(roadToRepair) === ERR_NOT_IN_RANGE) {
            creep.moveTo(roadToRepair);
        }
        return true;
    }
    return false;
}

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var prioritizedSite = creep.affinity("buildAffinity") || creep.room.find(FIND_CONSTRUCTION_SITES)[0],
            groupMemory = Memory.groups[creep.memory.group] || {},
            prioritizedRoom = groupMemory.room || creep.memory.room || creep.room.name,
            hasTowers = Game.rooms[prioritizedRoom].find(FIND_STRUCTURES, { filter: function(str) { return str.structureType === STRUCTURE_TOWER; } }),
            affinity = creep.affinity(),
            repaired = false,
            debugged = creep.name === "W58S48 Builder 3";

        switchMode(creep);
        
        if (creep.room.name !== prioritizedRoom) {
            if (!creep.isFull() && affinity && affinity.room === creep.room) {
                creep.pickupClosestEnergy(affinity);
            } else {
                creep.moveTo(new RoomPosition(24, 24, prioritizedRoom));
            }
        } else if (!prioritizedSite) {
            if (!repairRoad(creep)) {
                upgrading.run(creep);
            }
        } else if (creep.memory.building) {
            if (!hasTowers) {
                repaired = repairRoad(creep);
            }
            if (!repaired) {
                creep.moveByResult(creep.build(prioritizedSite), prioritizedSite);
            }
        } else {
            if (affinity && (affinity.room !== creep.room || creep.pos.y === 0 || creep.pos.x === 0 || creep.pos.y === 49 || creep.pos.x === 49)) {
                creep.moveTo(affinity);
            } else if (!creep.pickupClosestEnergy(prioritizedSite)) {
                creep.harvestClosestSource(prioritizedSite.closestSource(), prioritizedSite);
            }
        }
    }
};

