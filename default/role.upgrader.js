var roles = require("factory.roles");

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
        var workParts = _.filter(creep.body, function(part) { return part.type === WORK; }).length;

        switchMode(creep);

        if (creep.memory.upgrading && creep.room.memory.upgraded < CONTROLLER_MAX_UPGRADE_PER_TICK) {
            var result = creep.upgradeController(creep.room.controller);
            if (result === OK) {
                creep.room.memory.upgraded += workParts;
            }
            creep.moveByResult(result, creep.room.controller);
        } else {
            if (!creep.pickupClosestEnergy(creep.room.controller)) {
                creep.harvestClosestSource(
                    creep.room.controller.closestSource(), 
                    creep.room.controller
                );
            }
        }
        
    }
};