var bodies = {
    microDropper: [WORK, WORK, CARRY, MOVE],
    minidropper: [WORK, WORK, WORK, CARRY, MOVE, MOVE],
    semidropper: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    dropper: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    distributor: [CARRY, MOVE, MOVE],
    transporter: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    heralder: [MOVE],
    scout: [TOUGH, TOUGH, MOVE, MOVE],
    microWorker: [WORK, CARRY, MOVE, MOVE, MOVE],
    miniWorker: [WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
    semiWorker: [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    worker: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    claimer: [CLAIM, CLAIM, MOVE, MOVE],
    prober: [TOUGH, TOUGH, MOVE, MOVE]
    },
    defaultRoles = {
        heralder: {
            prefix: "Heralder",
            body: bodies.heralder
        },
        distributor: {
            prefix: "Distro",
            body: bodies.distributor
        },
        transporter: {
            prefix: "Transporter",
            body: bodies.transporter
        },
        claimer: {
            prefix: "Claimer",
            body: bodies.claimer
        },
        prober: {
            prefix: "Prober",
            body: bodies.prober
        }
    },
    roles = {
        1: {
            dropper: {
                prefix: "Dropper",
                body: bodies.microDropper
            },
            scout: {
                prefix: "Scout",
                body: [TOUGH, TOUGH, MOVE, MOVE]
            },
            harvester: {
                prefix: "Harvester",
                body: bodies.microWorker
            },
            builder: {
                prefix: "Builder",
                body: bodies.microWorker
            },
            upgrader: {
                prefix: "Upgrader",
                body: bodies.microWorker
            }
        },
        2: {
            dropper: {
                prefix: "Dropper",
                body: bodies.minidropper
            },
            harvester: {
                prefix: "Harvester",
                body: bodies.miniWorker
            },
            builder: {
                prefix: "Builder",
                body: bodies.miniWorker
            },
            upgrader: {
                prefix: "Upgrader",
                body: bodies.miniWorker
            }
        },
        3: {
            dropper: {
                prefix: "Dropper",
                body: bodies.semidropper
            },
            harvester: {
                prefix: "Harvester",
                body: bodies.semiWorker
            },
            builder: {
                prefix: "Builder",
                body: bodies.semiWorker
            },
            upgrader: {
                prefix: "Upgrader",
                body: bodies.semiWorker
            }
        },
        4: {
            dropper: {
                prefix: "Dropper",
                body: bodies.dropper
            },
            builder: {
                prefix: "Builder",
                body: bodies.worker
            },
            upgrader: {
                prefix: "Upgrader",
                body: bodies.worker
            },
            transporter: {
                prefix: "Transporter",
                body: bodies.transporter
            }
        },
        5: {
            dropper: {
                prefix: "Dropper",
                body: bodies.dropper
            },
            builder: {
                prefix: "Builder",
                body: bodies.worker
            },
            upgrader: {
                prefix: "Upgrader",
                body: bodies.worker
            },
            transporter: {
                prefix: "Transporter",
                body: bodies.transporter
            }


        }
    },
    maxLevel = 5;

module.exports = {
    get: function(level) {
        return _.extend({}, defaultRoles, roles[Math.min(level.id, maxLevel)]);
    }
};
