var harvesting = require("harvesting");
var levels = {
    
    /** @param {Creep} creep **/
    1: function(creep) {

	    if(creep.memory.upgrading) {
            creep.moveByResult(
                creep.upgradeController(creep.room.controller), 
                creep.room.controller
            );
        }
        else {
            if (!creep.pickupClosestEnergy(creep.room.controller)) {
                creep.harvestClosestSource(
                    creep.room.controller.closestSource(), 
                    creep.room.controller
                );
            }
	    }
	}
};

levels[2] = levels[1];
levels[3] = levels[1];
levels[4] = levels[1];
levels[5] = levels[1];
levels[6] = levels[1];

function switchMode(creep) {
    if (creep.memory.upgrading && creep.isEmpty()) {
        creep.memory.upgrading = false;
        creep.say('harvesting');
    }
    if (!creep.memory.upgrading && creep.isFull()) {
        creep.memory.upgrading = true;
        creep.say('upgrading');
    }
}

module.exports = {
    
    run: function (creep) {
        
        switchMode(creep);
        
        if (!creep.memory.level) {
            noLevel(creep);
        } else {
            levels[creep.memory.level](creep);
        }
        
    }
};