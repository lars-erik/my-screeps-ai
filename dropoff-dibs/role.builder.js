var upgrading = require("role.upgrader"),
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

levels[2] = levels[1];
levels[3] = levels[1];
levels[4] = levels[1];
levels[5] = levels[1];
levels[6] = levels[1];

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
        
        levels[creep.memory.level || 1](creep);
        
	}
};

