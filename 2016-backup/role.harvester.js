var building = require("role.builder"),
    levels = {};

function shouldTransfer(creep) {
    return creep.isFull() && !creep.room.isFull();
}

function canDrop(creep, dropOff) {
    return creep.carry.energy >= dropOff.energyCapacity - dropOff.energy;
}

function getClosestDropOff(creep) {
    var target = creep.getDibsObj("dropOff"),
        self = creep;
    if (!target) {
        target = creep.findClosestOfType(self, FIND_STRUCTURES, function (structure) {
            var isValidStructure = (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity &&
                    self.canPlaceDibs(structure, "dropOff");
            return isValidStructure;
        });
    }
    if (!target) {
        target = creep.findClosestOfType(self, FIND_STRUCTURES, function (structure) {
            return (structure.structureType === STRUCTURE_TOWER) &&
                structure.energy < structure.energyCapacity &&
                self.canPlaceDibs(structure, "dropOff");
        });
    }
    if (!target) {
        target = creep.findClosestOfType(self, FIND_STRUCTURES, function (structure) {
            return (structure.structureType === STRUCTURE_CONTAINER) &&
                Memory.productionContainers[structure.id] &&
                structure.energy < structure.energyCapacity &&
                self.canPlaceDibs(structure, "dropOff");
        });
    }
    return target;
}

levels[1] = function (creep) {

    var room = creep.room,
        dibsSource = creep.getDibsObj("dropOff"),
        closestDropOff = getClosestDropOff(creep),
        dropOff = dibsSource || closestDropOff,
        selectedSource = creep.affinity() || (dropOff || creep).closestSource(),
        isAtCapacity = room.isFull(),
        result
    ;
    
    if (isAtCapacity || !dropOff) {
        building.run(creep);  
    } else if (!creep.isFull()) {
        if (creep.memory.harvestOnly || !creep.pickupClosestEnergy(dropOff)) {
            result = creep.harvest(selectedSource);
            creep.moveByResult(result, selectedSource, dropOff, shouldTransfer);
        }
    } else if (canDrop(creep, dropOff) || creep.isFull()) {
        if (!creep.memory.dropOff) {
            dropOff.dibs("dropOff").place(creep);
        }
        result = creep.transfer(dropOff, RESOURCE_ENERGY);
        if (result === OK || result === ERR_FULL) {
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
