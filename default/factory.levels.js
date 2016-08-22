var rules,
    levels;

levels = {
    1: {
        id: 1,
        priority: [
            { role: "harvester", count: 3 },
            { role: "dropper", count: 2 },
            { role: "heralder", count: 1 },
            { role: "builder", count: 3 },
            { role: "upgrader", count: 2 },
            { role: "transporter", count: 0 }
        ]
    },
    2: {
        id: 2,
        priority: [
            { role: "harvester", count: 3 },
            { role: "dropper", count: 2 },
            { role: "heralder", count: 1 },
            { role: "builder", count: 3 },
            { role: "upgrader", count: 2 },
            { role: "transporter", count: 0 }
        ]
    },
    3: {
        id: 3,
        priority: [
            { role: "harvester", count: 3 },
            { role: "dropper", count: 2 },
            { role: "heralder", count: 1 },
            { role: "builder", count: 3 },
            { role: "upgrader", count: 2 },
            { role: "transporter", count: 0 }
        ]
    },
    4: {
        id: 4,
        priority: [
            { role: "harvester", count: 3 },
            { role: "dropper", count: 2 },
            { role: "heralder", count: 1 },
            { role: "builder", count: 3 },
            { role: "upgrader", count: 2 },
            { role: "transporter", count: 0 }
        ]
    },
    5: {
        id: 5,
        priority: [
            { role: "harvester", count: 3 },
            { role: "dropper", count: 2 },
            { role: "heralder", count: 1 },
            { role: "distributor", count: 4 },
            { role: "builder", count: 3 },
            { role: "upgrader", count: 2 },
            { role: "transporter", count: 0 }
        ]
    }
};

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
            capacity = room.find(FIND_MY_CREEPS).length === 0 ?
                room.energyAvailable :
                room.energyCapacityAvailable,
            currentLevels = room.memory.levels;
        if (!currentLevels) {
            console.log("replacing levels");
            if (room.name === "sim") {
                currentLevels = room.memory.levels = module.exports.simPriorities();
            } else {
                currentLevels = room.memory.levels = levels;
            }
        }
        
        for (i = rules.length - 1; i >= 0; i--) {
            rule = rules[i];
            if (capacity >= rule.threshold) {
                return currentLevels[rule.level];
            }
        }
        return {};
    },
    getById: function (id) {
        return levels[id];
    },
    reset: function (room, levels) {
        room.memory.levels = levels;
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
                        ],
                        memory: {
                            affinity: ""
                        }
                    },
                    {
                        groupName: "Sim Upper Energy",
                        group: [
                            { role: "dropper", count: 1 }
                        ],
                        memory: {
                            affinity: ""
                        }
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
                        ],
                        memory: {
                            affinity: ""
                        }
                    }
                ]
            }
        }
    },
    
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

