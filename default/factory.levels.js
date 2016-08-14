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
            { role: "upgrader", count: 2 }
        ]
    },
    2: {
        id: 2,
        priority: [
            { role: "harvester", count: 3 },
            { role: "dropper", count: 2 },
            { role: "heralder", count: 1 },
            { role: "builder", count: 3 },
            { role: "upgrader", count: 2 }
        ]
    },
    3: {
        id: 3
    }
};

rules = [
    { threshold: 300, level: 1 }, // starting
    { threshold: 500, level: 2 }, // 4 extensions, lvl 2
    { threshold: 750, level: 3 } // 9 extensions, lvl 3
];

module.exports = {
    get: function(room) {
        var i,
            rule,
            capacity = room.energyCapacityAvailable,
            currentLevels = room.memory.levels || levels;
        if (!room.memory.levels) {
            console.log("replacing levels")
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
