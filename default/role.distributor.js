module.exports = {
    run: function(creep) {
        var dibbedDropOff = creep.getDibsObj("dropOff"),
            closestDropOff = creep.closestDropOff(),
            dropOff = dibbedDropOff || closestDropOff,
            result;
        
        if (creep.isFull()) {
            if (!creep.memory.dropOff) {
                dropOff.dibs("dropOff").place(creep);
            }
            result = creep.transfer(dropOff, RESOURCE_ENERGY);
            if (result === OK || result === ERR_FULL) {
                dropOff.dibs("dropOff").remove(creep);
                creep.pickupClosestEnergy(dropOff);
            }
            if (result === ERR_NOT_IN_RANGE) {
                creep.moveTo(dropOff);
            }
        } else {
            creep.pickupClosestEnergy(dropOff);
        }
        
    }
};