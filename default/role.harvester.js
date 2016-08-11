var harvesting = require("harvesting"),
    building = require("role.builder"),
    levels = {};

function noLevel(creep) {
    var doRepair = false;
    if(creep.carry.energy < creep.carryCapacity) {
        var containers = creep.room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_CONTAINER });
        if (containers.length) {
            doRepairs = !harvesting.harvestClosest(creep, true);
        } else {
            doRepairs = !harvesting.harvestClosest(creep);
        }
    }
    else {
        var target = null;
        if (!target) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
        }
        if (!target) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
        }
        if (!target) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity;
                    }
                });
        }

        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            doRepair = true;
        }
    }
    if (doRepair && creep.carry.energy > 0) {
        var brokeRoom = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax;
            }
        })
        if (brokeRoom && creep.repair(brokeRoom) == ERR_NOT_IN_RANGE) {
            creep.moveTo(brokeRoom);
        } else {
            building.run(creep);
        }
    }
}

function closestPointAlongPath(path, obj) {
    var pos = obj.pos || obj,
        sorted = _.map(path, 
            (point) => { return { point: point, range: pos.getRangeTo(point.x, point.y) }; }
            ).sort((a, b) => a.range > b.range ? 1 : a.range < b.range ? -1 : 0);
    return sorted[0];
}

function tryMoveByPath(targetId, path, creep) {
    var closestPoint,
        result = creep.moveByPath(path);
    if (result == OK || result == ERR_TIRED) {
        console.log(creep.name + " ok");
        return;
    } 
    if (result == ERR_NOT_FOUND) {
        closestPoint = closestPointAlongPath(path, creep);
        if (closestPoint.range > 2)
        {
            result = creep.moveTo(closestPoint.x, closestPoint.y);
            console.log(creep.name + " move towards " + closestPoint.x + "," + closestPoint.y + " gave " + result);
            if (result == OK || ERR_TIRED)
            {
                return;
            }
        }
    }
    console.log(creep.name + " reverting " + result);
    creep.moveTo(Game.getObjectById(targetId));
}

function tryMoveTo(target, creep) {
    var result = creep.moveTo(target);
}

levels[1] = function(creep) {
    var spawn = creep.room.mainSpawn(),
        closestSource = Game.getObjectById(creep.room.memory.spawns[spawn.id].pathsByLength[0].id);
        
    if (creep.carry.energy < creep.carryCapacity) {
        if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
            tryMoveTo(closestSource, creep);
        }
    } else {
        if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            tryMoveTo(spawn, creep);
        }
    }
}

module.exports = {
    run: function(creep) {
        if (!creep.memory.level) {
            noLevel(creep);
        } else {
            levels[creep.memory.level](creep);
        }
	}
};
