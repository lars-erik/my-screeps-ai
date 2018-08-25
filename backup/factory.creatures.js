/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('factory.creatures');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    create: function(spawn) {
        var room = spawn.room,
            capacity = room.energyCapacity,
            energy = room.energyAvailable;
            
        console.log(capacity + "/" + energy);
        
        
    }
};