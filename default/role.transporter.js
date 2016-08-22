module.exports = {
    run: function(creep) {
        var memory = Memory.groups[creep.memory.group] || creep.memory,
            aId = memory.a,
            bId = memory.b,
            a = Game.creeps[aId] || Game.getObjectById(aId),
            aObj = Game.creeps[aId] || Game.getObjectById(aId),
            b = Game.getObjectById(bId),
            result;
        
        if (a instanceof Source) {
            a = a.pos.findInRange(FIND_DROPPED_ENERGY, 1)[0];
        }

        if (aObj && b) {
            if (creep.carry.energy < creep.carryCapacity && a && a.yield) {
                result = a.yield(creep, RESOURCE_ENERGY);
                if (result === OK && creep.carry.energy === creep.carryCapacity) {
                    creep.routeChange();
                    a.dibs().remove(creep);
                    creep.moveTo(b);
                } else if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(a);
                }
            } else {
                if (a && creep.memory.dibs) {
                    a.dibs().remove(creep);
                }
                result = creep.transfer(b, RESOURCE_ENERGY);
                if (result === OK) {
                    creep.routeChange();
                    if (a) {
                        a.dibs().place(creep, true);
                        creep.moveTo(a);
                    } else {
                        creep.moveTo(aObj);
                    }
                } else if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(b);
                }
            }
        }
    }
};
