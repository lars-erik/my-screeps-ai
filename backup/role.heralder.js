/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.heralder');
 * mod.thing == 'a thing'; // true
 */

var messages = [];

module.exports = {
    add: function(message) {
        messages.push(message);
        return messages.length;
    },
    run: function(creep) {
        if (creep.pos.x != 20 || creep.pos.y != 28) {
            creep.moveTo(20, 28);
        }
        
        if (creep.room.energyAvailable == creep.room.energyCapacityAvailable) {
            if (!creep.memory.saidFull) {
                console.log(creep.room.name + " at full capacity");
                creep.memory.saidFull = true;
            }
        } else {
            creep.memory.saidFull = false;
        }
        
        if (messages.length) {
            var message = messages.pop();
            creep.say(message);
            return;
        }
        
        if (Game.time % 2 == 0) {
            creep.say("E:" + Memory.info.energy + "/" + creep.room.energyCapacityAvailable);
        } else {
            var keylen = 0;
            for(var key in Game.creeps) {
                keylen++;
            }
            creep.say("C:" + keylen + "/14");
        }
    }
};