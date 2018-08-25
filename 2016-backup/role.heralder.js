/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.heralder');
 * mod.thing == 'a thing'; // true
 */

var messages = [];

function shorten(number) {
    if (number >= 1000) {
        return (Math.round(number / 100) / 10) + "'";
    }
    return number.toString();
}

module.exports = {
    add: function(message) {
        messages.push(message);
        return messages.length;
    },
    run: function (creep) {
        var target = (creep.group ? Memory.groups[creep.group].target : null) || creep.memory.target;
        if (!target) {
            target = { x: creep.room.mainSpawn().pos.x, y: creep.room.mainSpawn().pos.y - 2 };
        }

        if (creep.pos.x !== target.x || creep.pos.y !== target.y) {
            creep.moveTo(target.x, target.y);
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
        
        if (Game.time % 4 === 0 && Memory.rooms[creep.room.name].nextCreep) {
            creep.say("N: " + Memory.rooms[creep.room.name].nextCreep);
        } else if (Game.time % 3 === 0) {
            creep.say("F: " + Math.round(creep.room.fullness() * 100) + "%");
        } else if (Game.time % 2 === 0) {
            creep.say("E:" + shorten(creep.room.energyAvailable) + "/" + shorten(creep.room.energyCapacityAvailable));
        } else {
            creep.say("C:" + creep.room.creepCount() + "/" + creep.room.creepMax());
        }
    }
};