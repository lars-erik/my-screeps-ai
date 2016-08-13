var harvesting = require("harvesting"),
    upgrading = require("role.upgrader"),
    levels = {};
    
levels[1] = function(creep) {
    
    var prioritizedSite = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
    if (!prioritizedSite) {
        upgrading.run(creep);
    } else if (creep.memory.building) {
        creep.moveByResult(creep.build(prioritizedSite), prioritizedSite);
    } else {
        if (!creep.pickupClosestEnergy(prioritizedSite)) {
            creep.harvestClosestSource(prioritizedSite.closestSource(), prioritizedSite);
        }
    } 
}

function switchMode(creep) {
    if(creep.memory.building && creep.isEmpty()) {
        creep.memory.building = false;
        creep.say('harvesting');
    }
    if(!creep.memory.building && creep.isFull()) {
        creep.memory.building = true;
        creep.say('building');
    }
}

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        switchMode(creep);
        
        if (!creep.memory.level) {
            noLevel(creep);
        } else {
            levels[creep.memory.level](creep);
        }
        
	}
};


/* OBSOLETE */

function noLevel(creep) {

        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        if (!creep.memory.building && !harvesting.harvestClosest(creep, true, targets[0]) && !creep.isEmpty())
            creep.memory.building = true;

	    if(creep.memory.building) {
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                upgrading.run(creep);
                /*
                var brokeRooms = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.hits < structure.hitsMax;
                    }
                })
                if (brokeRooms.length) {
                    if (creep.repair(brokeRooms[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(brokeRooms[0]);
                    }
                } else {
                }
                */
            }
	    }
}