var roles = {
    1: {
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
        
    },
    3: {
        
    }
}

module.exports = {
    get: function(level) {
        return roles[level.id];
    }
};
