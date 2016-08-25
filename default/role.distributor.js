module.exports = {
    run: function(creep) {
        var dibbedDropOff = creep.getDibsObj("dropOff"),
            closestDropOff = creep.closestDropOff(),
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
                dropOff.dibs("dropOff").place(creep);
                creep.routeChange();
            }
            result = creep.transfer(dropOff, RESOURCE_ENERGY);
            if (result === OK || result === ERR_FULL) {
                dropOff.dibs("dropOff").remove(creep);
                creep.routeChange();
                if (creep.carry.energy < 50) {
                    creep.pickupClosestEnergy(dropOff);
                } else {
                    creep.moveTo(closestDropOff);
                }
            }
            if (result === ERR_NOT_IN_RANGE) {
                creep.moveTo(dropOff);
            }
        } else if (!mode || mode === "pickup") {
            creep.pickupClosestEnergy(dropOff);
        }

        if (creep.isFull() && creep.memory.dibs) {
            creep.getDibsObj().dibs().remove(creep);
        }
        
    }
};