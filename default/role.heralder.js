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
    run: function (creep) {
        if (creep.pos.x !== creep.room.mainSpawn().pos.x || creep.pos.y !== creep.room.mainSpawn().pos.y - 2) {
            creep.moveTo(creep.room.mainSpawn().pos.x, creep.room.mainSpawn().pos.y - 2);
        }
        
        if (creep.room.energyAvailable === creep.room.energyCapacityAvailable) {
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
            creep.say("E:" + creep.room.energyAvailable + "/" + creep.room.energyCapacityAvailable);
        } else {
            var creeplen = 0;
            for(var key in Game.creeps) {
                creeplen++;
            }
            var maxlen = 0,
                priority = creep.room.memory.levels[creep.memory.level].priority;
            for (var i = 0; i < priority.length; i++) {
                maxlen += priority[i].count;
            }
            creep.say("C:" + creeplen + "/" + maxlen);
        }
    }
};