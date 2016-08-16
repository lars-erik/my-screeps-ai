var building = require("role.builder"),
    levels = {};

function shouldTransfer(creep) {
    return creep.isFull() && !creep.room.isFull();
}

levels[1] = function (creep) {

    var room = creep.room,
        dropOff = creep.getDibsSource("dropOff") || creep.closestDropOff() || room.mainSpawn(),
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
    } else {
        if (!creep.memory.dropOff) {
            console.log(creep.name + " takes dibs on " + dropOff.idAndPos());
            dropOff.dibs("dropOff").place(creep);
        }
        result = creep.transfer(dropOff, RESOURCE_ENERGY);
        if (result === OK) {
            console.log(creep.name + " removes dibs on " + dropOff.idAndPos());
            dropOff.dibs("dropOff").remove(creep);
        }
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
