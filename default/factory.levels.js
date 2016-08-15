var rules,
    levels;

levels = {
    1: {
        id: 1,
        priority: [
            { role: "harvester", count: 3 },
            { role: "dropper", count: 2},
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
    get: function(room) {
        var i,
            rule,
            capacity = room.energyCapacityAvailable,
            currentLevels = room.memory.levels || levels;
        if (!room.memory.levels) {
            console.log("replacing levels");
            room.memory.levels = levels;
        }
        for(i = rules.length - 1; i>=0; i--) {
            rule = rules[i];
            if (capacity >= rule.threshold) {
                return currentLevels[rule.level];
            }
        }
        throw new Error("Threshold too low");
    }
};
