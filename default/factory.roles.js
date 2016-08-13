var roles = {
    1: {
        dropper: {
            prefix: "Dropper",
            body: [WORK, WORK, CARRY, MOVE]
        },
        harvester: {
            prefix: "Harvester",
            body: [WORK,WORK,CARRY,MOVE]
        },
        builder: {
            prefix: "Builder",
            body: [WORK,WORK,CARRY,MOVE]
        },
        upgrader: {
            prefix: "Upgrader",
            body: [WORK,WORK,CARRY,MOVE]
        }
    },
    2: {
        dropper: {
            prefix: "Dropper",
            body: [WORK,WORK,WORK,WORK,CARRY,MOVE]
        },
        harvester: {
            prefix: "Harvester",
            body: [WORK, WORK, CARRY, MOVE, MOVE]
        },
        builder: {
            prefix: "Builder",
            body: [WORK, WORK, CARRY, MOVE, MOVE]
        },
        upgrader: {
            prefix: "Upgrader",
            body: [WORK, WORK, CARRY, MOVE, MOVE]
        }
    },
    3: {
        
    }
}

module.exports = {
    get: function(level) {
        return roles[level.id];
    }
};
