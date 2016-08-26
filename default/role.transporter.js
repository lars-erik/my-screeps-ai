module.exports = {
    run: function(creep) {
        var memory = Memory.groups[creep.memory.group] || creep.memory,
            aId = memory.a,
            bId = memory.b,
            a = Game.creeps[aId] || Game.getObjectById(aId),
            aObj = Game.creeps[aId] || Game.getObjectById(aId),
            b = Game.getObjectById(bId),
            dropoffTarget,
            result,
            position,
            moveOpts = { reusePath: 20 },
            slackTarget,
            x, y;

        if (a instanceof Source) {
            a = a.pos.findInRange(FIND_DROPPED_ENERGY, 1)[0];
        }
        
        if (aObj && b) {
            if (_.sum(b.store) === b.storeCapacity && !creep.isEmpty()) {
                dropoffTarget = b.room.storage;
            } else {
                dropoffTarget = b;
            }
            
            if (creep.carry.energy < creep.carryCapacity && a && a.yield && (dropoffTarget.structureType === STRUCTURE_CONTAINER || dropoffTarget.structureType === STRUCTURE_LINK)) {
                creep.memory.slackTarget = null;
                result = a.yield(creep, RESOURCE_ENERGY);
                if (result === OK && creep.carry.energy === creep.carryCapacity) {
                    creep.routeChange();
                    a.dibs().remove(creep);
                    creep.moveTo(b, moveOpts);
                } else if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(a, moveOpts);
                }
            } else if (creep.isFull() || dropoffTarget.structureType === STRUCTURE_STORAGE) {
                creep.memory.slackTarget = null;
                
                if (a && creep.memory.dibs) {
                    a.dibs().remove(creep);
                }

                result = creep.transfer(dropoffTarget, RESOURCE_ENERGY);
                
                if (result === OK) {
                    creep.routeChange();
                    if (a) {
                        a.dibs().place(creep, true);
                        creep.moveTo(a, moveOpts);
                    } else {
                        creep.moveTo(aObj, moveOpts);
                    }
                } else if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropoffTarget, moveOpts);
                }
            } else {
                slackTarget = Game.getObjectById(creep.memory.slackTarget);
                if (slackTarget === null) {
                    for (x = -4; x <= 4; x++) {
                        for (y = -4; y <= 4; y++) {
                            if ((x < -1 || x > 1) && (y < -1 || y > 1)) {
                                position = new RoomPosition(aObj.pos.x + x, aObj.pos.y + y, aObj.room.name);
                                if (position.lookFor(LOOK_TERRAIN)[0] === "plain" && position.lookFor(LOOK_CREEPS).length === 0) {
                                    slackTarget = position;
                                    creep.memory.slackTarget = slackTarget.id;                                 
                                    break;
                                }
                            }
                        }
                        if (slackTarget !== null) {
                            break;
                        }
                    }
                }
                if (slackTarget !== null) {
                    creep.moveTo(slackTarget);
                } else {
                    creep.moveTo(aObj);
                }
            }
        }
    }
};
