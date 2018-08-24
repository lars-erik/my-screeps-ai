module.exports = {
    execute(creep) {
        if (creep.carry.energy >= creep.carryCapacity) {
            let dropOff = creep.room.find(FIND_STRUCTURES, {filter: s => {
                return s.structureType === STRUCTURE_SPAWN
                    && s.energy < s.energyCapacity
            }})[0];
            if (dropOff) {
                if (creep.transfer(dropOff, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropOff);
                }
            } else {
                let controller = creep.room.find(FIND_CONTROLLER)[0];
                if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller);
                }
            }
        } else {
            let resource = creep.room.find(FIND_SOURCES)[0];
            if (creep.harvest(resource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(resource);
            }
        }
    }
}