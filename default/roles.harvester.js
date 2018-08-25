const dropOffTypes = [STRUCTURE_SPAWN, STRUCTURE_EXTENSION];
module.exports = {
    execute(creep) {
        if (creep.carry.energy >= creep.carryCapacity) {
            let dropOff = creep.room.find(FIND_STRUCTURES, {filter: s => {
                return dropOffTypes.indexOf(s.structureType) > -1
                    && s.energy < s.energyCapacity
            }})[0];
            if (dropOff) {
                if (creep.transfer(dropOff, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropOff, {visualizePathStyle: {stroke: '#44ff44'}});
                }
            } else {
                let controller = creep.room.controller;
                if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, {visualizePathStyle: {stroke: '#4444ff'}});
                }
            }
        } else {
            let sourceIndex = 0;
            const sources = creep.room.find(FIND_SOURCES);
            while(sourceIndex < sources.length) {
                let resource = sources[sourceIndex];
                const harvestResult = creep.harvest(resource);
                if (harvestResult === ERR_NOT_IN_RANGE) {
                    const moveResult = creep.moveTo(resource, {visualizePathStyle: {stroke: '#ff4444'}});
                    if (moveResult != ERR_NO_PATH) {
                        break;
                    }
                } else if (harvestResult === OK) {
                    break;
                }
                sourceIndex++;
            }
        }
    }
}