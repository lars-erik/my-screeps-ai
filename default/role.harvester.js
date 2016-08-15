var building = require("role.builder"),
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
    } else if (!creep.isFull() && creep.carry.energy < dropOff.energyCapacity - dropOff.energy) {
        if (!creep.pickupClosestEnergy(dropOff)) {
            result = creep.harvest(selectedSource);
            creep.moveByResult(result, selectedSource, dropOff, shouldTransfer);
        }
        if (creep.pos.x == 12 && creep.pos.y == 25) {
            creep.moveTo(13, 24);
        }
    } else {
        result = creep.transfer(dropOff, RESOURCE_ENERGY);
        creep.moveByResult(result, dropOff, selectedSource);
    }
}

levels[2] = levels[1];
levels[3] = levels[1];
levels[4] = levels[1];
levels[5] = levels[1];
levels[6] = levels[1];

module.exports = {
    run: function(creep) {
        levels[creep.memory.level || 1](creep);
	}
};
