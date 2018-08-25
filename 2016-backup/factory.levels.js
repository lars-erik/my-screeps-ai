var rules,
    levels;

let defaultPriorities = [
    {
        groupName: "Energy",
        group: [
            { role: "dropper", count: 1 },
            { role: "distributor", count: 3 },
        ]
    },
    { role: "heralder", count: 1 },
    {
        groupName: "Builders",
        group: [
            { role: "builder", count: 1 },
        ]
    },
    {
        groupName: "Upgraders",
        group: [
            { role: "upgrader", count: 1 },
        ]
    }
];

let emergencyPriorities = [
    {
        groupName: "Emergency",
        group: [
            { role: "harvester", body: "microWorker", count: 2 }
        ]
    }
];

rules = [
    { threshold: 300, level: 1 }, // starting
    { threshold: 550, level: 2 }, // 5 extensions, lvl 2
    { threshold: 800, level: 3 }, // 10 extensions, lvl 3
    { threshold: 1300, level: 4 }, // 20 extensions, lvl 4
    { threshold: 1800, level: 5 } // 20 extensions, lvl 4
];

module.exports = {
    get: function (room) {
        var i,
            rule,
            creepCount = room.find(FIND_MY_CREEPS).length,
            capacity = room.energyCapacityAvailable,
            priorities = room.memory.priorities,
            roomEmergencyPri;
        
        if (creepCount < 2) {
            roomEmergencyPri = _.extend({}, emergencyPriorities);
            roomEmergencyPri[0].groupName = room.name + " Emergency";
            return {
                id: 1,
                priority: emergencyPriorities
            }
        }
                  
        if (!priorities) {
            console.log("replacing priorities");
            priorities = room.memory.priorities = JSON.parse(JSON.stringify(defaultPriorities));
            for (i = 0; i < priorities.length; i++) {
                if (priorities[i].group) {
                    priorities[i].groupName = room.name + " " + priorities[i].groupName;
                }
            }
        }
        
        for (i = rules.length - 1; i >= 0; i--) {
            rule = rules[i];
            if (capacity >= rule.threshold) {
                return {
                    id: rule.level,
                    priority: priorities
                }
            }
        }
        return {};
    },
    
    simPriorities: function () {
        return {
            1: {
                id: 1,
                priority:
                [
                    {
                        groupName: "Sim Mid Energy",
                        group: [
                            { role: "dropper", count: 1 },
                            { role: "distributor", count: 3 }
                        ]
                    },
                    {
                        groupName: "Sim Upper Energy",
                        group: [
                            { role: "dropper", count: 1 }
                        ]
                    },
                    {
                        groupName: "Sim Builders",
                        group: [
                            { role: "builder", count: 2 }
                        ]
                    },
                    {
                        groupName: "Sim Upgraders",
                        group: [
                            { role: "upgrader", count: 2 },
                        ]
                    }
                ]
            }
        }
    },
    simGroups: function() {
        return {
            "Sim Mid Energy": {
                affinity: ""
            },
            "Sim Upper Energy": {
                affinity: ""
            },
            "Sim Builders": {
                affinity: ""
            },
            "Sim Upgraders": {
                affinity: ""
            }
        };
    },
    
    resetWorldData: function() {
        var worldPri = module.exports.worldPriorities(),
            groupMemory = module.exports.worldGroupMemory(),
            roomKey, levelKey;
        Memory.groups = _.extend(Memory.groups, groupMemory);
        for (roomKey in worldPri) {
            for (levelKey in worldPri[roomKey]) {
                Memory.rooms[roomKey].levels[levelKey] = {
                    id: levelKey,
                    priority: worldPri[roomKey][levelKey]
                };
            }
        }
    },

    worldPriorities: function () {
        return {
            W58S48: {
                "5": [
                    {
                        groupName: "W58S48 Lower Energy",
                        group: [
                            { role: "dropper", body: "slowDropper", count: 1 },
                            { role: "distributor", count: 4 }
                        ]
                    },
                    { role: "heralder", count: 1 },
                    {
                        groupName: "W58S48 Upper Energy",
                        group: [
                            { role: "dropper", count: 1 },
                            { role: "distributor", count: 4 }
                        ]
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
                        ]
                    },
                    {
                        groupName: "W58S48 Taxers W58S49",
                        group: [
                            { role: "transporter", count: 2 }
                        ]
                    },
                    {
                        groupName: "W58S48 Harvesters W59S47",
                        group: [
                            { role: "attacker", count: 2 },
                            { role: "claimer", count: 1 },
                            { role: "dropper", count: 1 },
                            { role: "transporter", count: 9 }
                        ]
                    }
                ]
            },
            W58S49: {
                4: [
                    {
                        groupName: "W58S49 Energy",
                        group: [
                            { role: "dropper", count: 1 },
                            { role: "distributor", count: 3 }
                        ]
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
                        ]
                    }
                ]
            }
        };
    },
    
    worldGroupMemory: function () {
        return {
            "W58S48 Lower Energy": {
                affinity: "579fa8710700be0674d2d9ce",
                loadOff: "57b756c4e76871b06b5fed7e"
            },
            "W58S48 Upper Energy": {
                affinity: "579fa8710700be0674d2d9cd",
                loadOff: "57ab415c4dddc2a3298b6c37"
            },
            "W58S48 Builders": {},
            "W58S48 Upgraders" : {},
            "W58S48 Upper Transport" : {
                a: "57ab415c4dddc2a3298b6c37",
                b: "57af29c7d519a84b334f8e9e"
            },
            "W58S48 Taxers W58S49" : {
                a: "57b8c732ecb4b1922c4039fd",
                b: "57ac815400d93c7d39333830"
            },
            "W58S48 Harvesters W59S47": {
                a: "579fa85e0700be0674d2d84b",
                b: "57ab415c4dddc2a3298b6c37",
                target: {
                    room: "W59S47",
                    x: 24,
                    y: 24
                }
            },
            "W58S49 Energy": {
                affinity: "579fa8710700be0674d2d9d0",
                loadOff: "57ba514d255683f215ad5d7c"
            },
            "W58S49 Builders": {},
            "W58S49 Upgraders": {},
            "W58S49 Lower Harvesters W59S49": {
                a: "579fa85e0700be0674d2d852",
                b: "57b8c732ecb4b1922c4039fd",
                target: {
                    room: "W59S49",
                    x: 41,
                    y: 42
                }
            }
        };
    }
};

