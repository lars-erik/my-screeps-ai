var creatureFactory = require("factory.creatures"),
    roles = require("factory.roles"),
    groups = require("memory.groups"),
    levelFactory = require("factory.levels");

String.prototype.padRight = function(length, fillChar) {
    var newVal = this.toString(),
        i;
    if (this.length < length) {
        for (i = this.length; i < length; i++) {
            newVal += fillChar || " ";
        }
    }
    return newVal;
}

String.prototype.padLeft = function(length, fillChar) {
    var newVal = this.toString(),
        i;
    if (this.length < length) {
        for (i = this.length; i < length; i++) {
            newVal = (fillChar || " ") + newVal;
        }
    }
    return newVal;
}

global.Utils = {
    listCreeps: function (showMemory) {
        var creeps = _.sortBy(Game.creeps, function (creep) {
            return creep.room.roomName + creep.name;
        }),
            i;
        console.log("Name                  Level Bodyparts   TTL " + (showMemory ? "Memory" : ""));
        for (i = 0; i < creeps.length; i++) {
            console.log(creeps[i].name.padRight(21) + " " + 
                        creeps[i].memory.level.toString().padLeft(5) + " " + 
                        creeps[i].body.length.toString().padLeft(9) + " " + 
                        creeps[i].ticksToLive.toString().padLeft(5) + 
                        (showMemory ? " " + JSON.stringify(creeps[i].memory) : ""));
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
    listRooms: function () {
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
    listTransporters: function () {
        var info = _.sortBy(
            _.map(
                _.filter(Game.creeps, function (creep) { return creep.memory.role === "transporter"; }),
            function (creep) {
                    return creep.name + " A: " + creep.memory.a + " B: " + creep.memory.b;
                }
            ));
        return JSON.stringify(info, null, "\t");

    },
    listContainers: function () {
        var roomKey,
            room,
            containers,
            i,
            roomTotal,
            total = 0,
            output = "";
        
        for (roomKey in Game.rooms) {
            room = Game.rooms[roomKey];
            roomTotal = 0;
            containers = room.find(FIND_STRUCTURES, { filter: function (structure) { return structure.structureType === STRUCTURE_CONTAINER } });
            for (i = 0; i < containers.length; i++) {
                output += room.name + " " + containers[i].id + " " + containers[i].pos.x + "," + containers[i].pos.y + " " + containers[i].store.energy + "\n";
                roomTotal += containers[i].store.energy;
            }
            total += roomTotal;
            output += room.name + " " + roomTotal + "\n";
        }
        output += "Total  " + total;
        return output;
    },
    resetDibs: function (roomName) {
        var room = Game.rooms[roomName],
            creep,
            key;
        
        room.memory.dibs = {};
        
        for (key in Game.creeps) {
            creep = Game.creeps[key];
            if (creep.role !== "dropper" && creep.room.name === roomName) {
                creep.memory.dibs = null;
                creep.memory.dropOff = null;
            }
        }
    },
    pathLength: function (a, b) {
        var aObj = Game.getObjectById(a),
            bObj = Game.getObjectById(b),
            len = aObj.pos.findPathTo(bObj).length;
        if (aObj.pos.roomName !== bObj.pos.roomName) {
            len += bObj.pos.findPathTo(aObj).length;
        }
        return len;
    },
    optimalRoute: function (a, b, prefix) {
        var length = Utils.pathLength(a, b) * 2,
            energyPerTrip = roles.parts("transporter", CARRY) * 50,
            transporterCost = roles.bodyCost("transporter"),
            dropperCost = roles.bodyCost("dropper"),
            claimerCost = roles.bodyCost("miniClaimer"),
            energyPerLifetime = 1500 / length * energyPerTrip,
            transportersNeeded = 15000 / energyPerLifetime,
            transporters = Math.round(transportersNeeded),
            profitPerTransporter = energyPerLifetime - transporterCost - dropperCost / transporters - claimerCost / transporters;
        
        if (prefix) {
            return "L:" + length + " EPL: " + Math.round(energyPerLifetime * 100) / 100 + " PPT:" + Math.round(profitPerTransporter * 100) / 100 + " OPT: " + Math.round(transportersNeeded * 1000) / 1000 + " RND: " + transporters;
        } else {
            return length.toString().padLeft(7) + " " + 
                Math.floor(energyPerLifetime).toString().padLeft(6) + " " +
                Math.floor(profitPerTransporter).toString().padLeft(6) + " " + 
                (Math.floor(transportersNeeded * 1000) / 1000).toString().padLeft(8) + " " +
                transporters.toString().padLeft(7);
        }
    },
    optimizeRoutes: function () {
        var key,
            memory,
            hasCreeps,
            aObj, bObj,
            output = "";
        function creepFilter(k) {
            return function(creep) {
                return creep.memory.group === k && creep.memory.role === "transporter";
            }
        }
        output += "Group                           From-To         Creeps  Length    EPL    PPT      OPT   OPT.R.\n";
        for (key in Memory.groups) {
            memory = Memory.groups[key];
            if (memory.a && memory.b) {
                aObj = Game.getObjectById(memory.a);
                bObj = Game.getObjectById(memory.b);
                output += key.padRight(31) + " " + 
                        (aObj.xy() + "-" + bObj.xy()).padRight(15) + " " + 
                        _.filter(Game.creeps, creepFilter(key)).length.toString().padLeft(6) + " " +
                        Utils.optimalRoute(memory.a, memory.b) + "\n";
            }
        }
        return output;
    },
    listPriorities: function (room) {
        var roomMemory = Memory.rooms[room],
            priorities = roomMemory.levels[roomMemory.level].priority,
            i,
            output = "";
        for (i = 0; i < priorities.length; i++) {
            output += i + " " + priorities[i].role + " " + priorities[i].count + "\n";
        }
        return output;
    },
    createOne: creatureFactory.createOne,
    bodyCost: roles.bodyCost,
    groups: groups.utils,
    levelFactory: levelFactory

};
