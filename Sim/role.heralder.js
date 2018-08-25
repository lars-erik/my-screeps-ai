/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.heralder');
 * mod.thing == 'a thing'; // true
 */

var messages = [];
var spawn = Game.spawns.Spawn;

function countCreeps() {
    var keylen = 0;
    for(var key in Game.creeps) {
        keylen++;
    }
    return keylen;
}

module.exports = {
    add: function(message) {
        messages.push(message);
        return messages.length;
    },
    run: function(creep) {
        if (creep.pos.x != spawn.pos.x || creep.pos.y != spawn.pos.y - 3) {
            creep.moveTo(spawn.pos.x, spawn.pos.y - 3);
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
            creep.say("E:" + creep.room.energyAvailable + "/" + creep.room.energyCapacityAvailable);
        } else {
            creep.say("C:" + countCreeps() + "/15");
        }
    }
};