var creatureFactory = require("factory.creatures"),
    roles = require("factory.roles"),
    groups = require("memory.groups");

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
    optimalRoute: function (a, b) {
        var length = Utils.pathLength(a, b) * 2,
            energyPerTrip = roles.parts("transporter", CARRY) * 50,
            transporterCost = roles.bodyCost("transporter"),
            dropperCost = roles.bodyCost("dropper"),
            claimerCost = roles.bodyCost("miniClaimer"),
            energyPerLifetime = 1500 / length * energyPerTrip,
            transportersNeeded = 15000 / energyPerLifetime,
            transporters = Math.round(transportersNeeded),
            profitPerTransporter = energyPerLifetime - transporterCost - dropperCost / transporters - claimerCost / transporters;
        
        return "L:" + length + " EPL: " + Math.round(energyPerLifetime * 100) / 100 + " PPT:" + Math.round(profitPerTransporter * 100) / 100 + " OPT: " + transportersNeeded + " RND: " + transporters;
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
    
    tempGroupedPriorities: function () {
        return {
            W58S48: {
                "5": [
                    {
                        groupName: "W58S48 Lower Energy",
                        group: [
                            { role: "dropper", count: 1 },
                            { role: "distributor", count: 4 }
                        ],
                        memory: {
                            affinity: "579fa8710700be0674d2d9ce",
                            dropOff: "57b756c4e76871b06b5fed7e"
                        }
                    },
                    { role: "heralder", count: 1 },
                    {
                        groupName: "W58S48 Upper Energy",
                        group: [
                            { role: "dropper", count: 1 },
                            { role: "distributor", count: 4 }
                        ],
                        memory: {
                            affinity: "579fa8710700be0674d2d9cd",
                            dropOff: "57ab415c4dddc2a3298b6c37"
                        }
                    },
                    {
                        groupName: "W58S48 Builders",
                        group: [
                            { role: "builder", count: 2 }
                        ]
                    },
                    {
                        groupName: "W58S48 Upgraders",
                        group: [
                            { role: "upgrader", count: 2 }
                        ]
                    },
                    {
                        groupName: "W58S48 Upper Transport",
                        group: [
                            { role: "transporter", count: 4 }
                        ],
                        memory: {
                            a: "57ab415c4dddc2a3298b6c37",
                            b: "57af29c7d519a84b334f8e9e"
                        }
                    },
                    {
                        groupName: "W58S48 Taxers W58S49",
                        group: [
                            { role: "transporter", count: 2 }
                        ],
                        memory: {
                            a: "57b8c732ecb4b1922c4039fd",
                            b: "57ac815400d93c7d39333830"
                        }
                    },
                    {
                        groupName: "W58S48 Harvesters W59S47",
                        group: [
                            { role: "attacker", count: 2 },
                            { role: "claimer", count: 1 },
                            { role: "dropper", count: 1 },
                            { role: "transporter", count: 9 }
                        ],
                        memory: {
                            a: "579fa85e0700be0674d2d84b",
                            b: "57ab415c4dddc2a3298b6c37",
                            target: {
                                room: "W59S47",
                                x: 24,
                                y: 24
                            }
                        }
                    }
                ]
            },
            W58S49: {
                3: [
                    {
                        groupName: "W58S49 Energy",
                        group: [
                            { role: "dropper", count: 1 },
                            { role: "distributor", count: 3 }
                        ],
                        memory: {
                            affinity: "579fa8710700be0674d2d9d0",
                            dropOff: "57ba514d255683f215ad5d7c"
                        }
                    },
                    { role: "heralder", count: 1 },
                    {
                        groupName: "W58S49 Builders",
                        group: [
                            { role: "builder", count: 2 }
                        ]
                    },
                    {
                        groupName: "W58S49 Upgraders",
                        group: [
                            { role: "builder", count: 1 }
                        ]
                    },
                    {
                        groupName: "W58S49 Lower Harvesters W59S49",
                        group: [
                            { role: "attacker", count: 1 },
                            { role: "claimer", count: 1 },
                            { role: "dropper", count: 1 },
                            { role: "transporter", count: 6 }
                        ],
                        memory: {
                            a: "579fa85e0700be0674d2d852",
                            b: "57b8c732ecb4b1922c4039fd",
                            target: {
                                room: "W59S49",
                                x: 41,
                                y: 42
                            }
                        }
                    }
                ]
            }
        };
    }
};
