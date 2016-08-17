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
            distributor: {
                prefix: "Distro",
                body: [CARRY, MOVE, MOVE]
            },
            harvester: {
                prefix: "Harvester",
                body: [WORK, WORK, CARRY, MOVE]
            },
            builder: {
                prefix: "Builder",
                body: [WORK, WORK, CARRY, MOVE]
            },
            upgrader: {
                prefix: "Upgrader",
                body: [WORK, WORK, CARRY, MOVE]
            }
        },
        2: {
            heralder: {
                prefix: "Heralder",
                body: [MOVE]
            },
            dropper: {
                prefix: "Dropper",
                body: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
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
                body: [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
            }
        },
        3: {
            // 800
            heralder: {
                prefix: "Heralder",
                body: [MOVE]
            },
            dropper: {
                prefix: "Dropper",
                body: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE] // 800
            },
            harvester: {
                prefix: "Harvester",
                body: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 750
            },
            builder: {
                prefix: "Builder",
                body: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 750
            },
            upgrader: {
                prefix: "Upgrader",
                body: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 750
            },
            transporter: {
                prefix: "Transporter",
                body: [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] // 400
            }
        },
        4: {
            // 1300
            heralder: {
                prefix: "Heralder",
                body: [MOVE]
            },
            dropper: {
                prefix: "Dropper",
                body: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 850
            },
            harvester: {
                prefix: "Harvester",
                body: [
                    WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE

                ] // 1200
            },
            builder: {
                prefix: "Builder",
                body: [
                    WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE

                ] // 1200
            },
            upgrader: {
                prefix: "Upgrader",
                body: [
                    WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE

                ] // 1200
            },
            transporter: {
                prefix: "Transporter",
                body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 600
            }
        },
        5: {
            // 1800
            heralder: {
                prefix: "Heralder",
                body: [MOVE]
            },
            dropper: {
                prefix: "Dropper",
                body: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 850
            },
            distributor: {
                prefix: "Distro",
                body: [CARRY, MOVE, MOVE]
            },
            scout: {
                prefix: "Scout",
                body: [TOUGH, TOUGH, MOVE, MOVE]
            },
            harvester: {
                prefix: "Harvester",
                body: [
                    WORK, WORK, 
                    CARRY, 
                    MOVE, MOVE, MOVE, MOVE
                ] // 450
            },
            builder: {
                prefix: "Builder",
                body: [
                    WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ] // 1800
            },
            upgrader: {
                prefix: "Upgrader",
                body: [
                    WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ] // 1800
            },
            transporter: {
                prefix: "Transporter",
                body: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] // 450
            },
            claimer: {
                prefix: "Claimer",
                body: [CLAIM, CLAIM, MOVE, MOVE] // 1300
            }
        }
    },
    maxLevel = 5;

module.exports = {
    get: function(level) {
        return roles[Math.min(level.id, maxLevel)];
    }
};
