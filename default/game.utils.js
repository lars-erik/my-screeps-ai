var creatureFactory = require("factory.creatures"),
    roleFactory = require("factory.roles");

global.Utils = {
    listCreeps: function (showMemory) {
        var creeps = _.sortBy(Game.creeps, function (creep) {
            return creep.room.roomName + creep.name;
        }),
            i;
        for (i = 0; i < creeps.length; i++) {
            console.log(creeps[i].name + " LVL: " + creeps[i].memory.level + " BP: " + creeps[i].body.length + " " + 
                        " TCK: " + creeps[i].ticksToLive + 
                        (showMemory ? " MEM: " + JSON.stringify(creeps[i].memory) : ""));
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
    listRooms: function() {
        var output = "",
            room,
            key,
            totE = 0,
            totC = 0;
        for (key in Game.rooms) {
            room = Game.rooms[key];
            totE += room.energyAvailable;
            totC += room.energyCapacityAvailable;
            output += room.name + " E:" + room.energyAvailable + " C:" + room.energyCapacityAvailable + " " +
                Math.round(room.energyAvailable / room.energyCapacityAvailable * 100) + "%\n";
        }
        output += "Total  E:" + totE + " C: " + totC + " " + Math.round(totE / totC * 100) + "%\n";
        return output;
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
    pathLength: function(a, b) {
        var aObj = Game.getObjectById(a),
            bObj = Game.getObjectById(b),
            len = aObj.pos.findPathTo(bObj).length;
        return len;
    },
    createOne: creatureFactory.createOne,
    bodyCost: roleFactory.bodyCost,
    
};
