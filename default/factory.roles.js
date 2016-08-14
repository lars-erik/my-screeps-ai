var roles = {
    1: {
        heralder: {
            prefix: "Heralder",
            body: [MOVE]
        },
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
        heralder: {
            prefix: "Heralder",
            body: [MOVE]
        },
        dropper: {
            prefix: "Dropper",
            body: [WORK, WORK, WORK, WORK, CARRY, MOVE]
        },
        harvester: {
            prefix: "Harvester",
            body: [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        builder: {
            prefix: "Builder",
            body: [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        upgrader: {
            prefix: "Upgrader",
            body: [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        transporter: {
            prefix: "Transporter",
            body: [CARRY, MOVE, MOVE]
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
