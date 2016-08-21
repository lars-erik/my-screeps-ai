/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.claimer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function (creep) {
        var room = creep.pos.roomName,
            target = _.extend({ room: creep.memory.room || room, x: 20, y: 20 }, creep.memory.target),
            targetPos;

        targetPos = new RoomPosition(target.x, target.y, target.room);
        if (room !== targetPos.roomName) {
            creep.moveTo(targetPos);
        } else {
            var controller = creep.room.controller;
            var result = creep.claimController(controller);
            if (result === ERR_GCL_NOT_ENOUGH) {
                result = creep.reserveController(controller);
            }
            if (result !== OK) {
                creep.moveTo(controller);
            }
        }
    }
};