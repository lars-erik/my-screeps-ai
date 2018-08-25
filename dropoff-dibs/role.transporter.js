module.exports = {
    run: function(creep) {
        var aId = creep.memory.a,
            bId = creep.memory.b,
            a = Game.getObjectById(aId),
            b = Game.getObjectById(bId),
            result;
        if (a && b) {
            if (creep.carry.energy < creep.carryCapacity) {
                result = a.yield(creep, RESOURCE_ENERGY);
                if (result == OK && creep.carry.energy == creep.carryCapacity) {
                    a.dibs().remove(creep);
                    creep.moveTo(b);
                } else if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(a);
                } else if (result != -6) {
                }
            } else {
                if (creep.memory.dibs) {
                    a.dibs().remove(creep);
                }
                result = creep.transfer(b, RESOURCE_ENERGY);
                if (result == OK) {
                    a.dibs().place(creep, true);
                    creep.moveTo(a);
                } else if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(b);
                } else {
                }
            }
        }
    }
};
