/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.claimer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        var room = creep.pos.roomName;
        if (room != creep.memory.room ) {
            console.log("moving to room");
            creep.moveTo(new RoomPosition(20, 20, creep.memory.room));
        } else {
            if (creep.pos.y == 49) {
                creep.moveTo(new RoomPosition(20, 20, creep.memory.room));
            } else {
                var controller = creep.room.controller;
                var result;
                if ((result = creep.claimController(controller)) != OK) {
                    console.log("couldn't claim due to " + result);
                    creep.moveTo(controller);
                }
            }
        }
    }
};