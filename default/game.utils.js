var creatureFactory = require("factory.creatures");
module.exports = {
    init: function(game) {
        game.utils = {
            listCreeps: function () {
                var creeps = _.sortBy(Game.creeps, function (creep) {
                    return creep.room.roomName + creep.name;
                }),
                    i;
                for (i = 0; i < creeps.length; i++) {
                    console.log(creeps[i].name + " LVL: " + creeps[i].memory.level + " BP: " + creeps[i].body.length + " " + 
                    " TCK: " + creeps[i].ticksToLive + " MEM: " +
                    JSON.stringify(creeps[i].memory));
                }
                return "";
            },
            listCreepMemory: function () {
                var creeps = Memory.creeps,
                    key;
                for (key in creeps) {
                    console.log(key + " LVL: " + creeps[key].level + " MEM: " + JSON.stringify(creeps[key]));
                }
                return "";
            },
            resetDibs: function(roomName) {
                var room = Game.rooms[roomName],
                    creep,
                    key;

                room.memory.dibs = {};

                for (key in Game.creeps) {
                    creep = Game.creeps[key];
                    if (creep.role !== "dropper") {
                        creep.memory.dibs = null;
                        creep.memory.dropOff = null;
                    }
                }
            },
            createOne: creatureFactory.createOne
        }
    }
}
