/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        var aId = creep.memory.a,
            bId = creep.memory.b,
            a = Game.getObjectById(aId),
            b = Game.getObjectById(bId),
            result;
        if (a && b) {
            if (creep.carry.energy < creep.carryCapacity) {
                result = creep.withdraw(a, RESOURCE_ENERGY);
                if (result == OK && creep.carry.energy == creep.carryCapacity) {
                    creep.moveTo(b);
                } else if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(a);
                } 
            } else {
                result = creep.transfer(b, RESOURCE_ENERGY);
                if (result == OK) {
                    creep.moveTo(a);
                } else if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(b);
                }
            }
        }
    }
};