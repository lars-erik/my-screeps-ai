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
                _.sum(structure.store) < structure.storeCapacity;
        });
    }
    return target;
}

module.exports = {
    run: function(creep) {
        var dibbedDropOff = creep.getDibsObj("dropOff"),
            closestDropOff = getClosestDropOff(creep),
            dropOff = dibbedDropOff || closestDropOff,
            mode = creep.memory.mode,
            result;
        
        if (creep.isFull() && dropOff) {
            mode = creep.memory.mode = "dropOff";
        } else if (creep.carry.energy < 50) {
            mode = creep.memory.mode = "pickup";
        }

        if (mode === "dropOff" && dropOff) {
            if (!creep.memory.dropOff) {
                if (dropOff.structureType !== STRUCTURE_CONTAINER) {
                    dropOff.dibs("dropOff").place(creep);
                }
                creep.routeChange();
            }
            result = creep.transfer(dropOff, RESOURCE_ENERGY);
            if (result === OK || result === ERR_FULL) {
                dropOff.dibs("dropOff").remove(creep);
                creep.routeChange();
                if (creep.carry.energy < 50) {
                    creep.pickupClosestEnergy(dropOff);
                } else {
                    creep.moveTo(creep.closestDropOff());
                }
            }
            if (result === ERR_NOT_IN_RANGE) {
                creep.moveTo(dropOff);
            }
        } else if (!mode || mode === "pickup") {
            creep.pickupClosestEnergy(dropOff, false);
        }

        if (creep.isFull() && creep.memory.dibs) {
            creep.getDibsObj().dibs().remove(creep);
        }
        
    }
};