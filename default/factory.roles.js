var bodies = {
    microDropper: [WORK, WORK, CARRY, MOVE],
    minidropper: [WORK, WORK, WORK, CARRY, MOVE, MOVE],
    semidropper: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    dropper: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    slowDropper: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
    distributor: [CARRY, MOVE, MOVE],
    transporter: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    heralder: [MOVE],
    scout: [TOUGH, TOUGH, MOVE, MOVE],
    microWorker: [WORK, CARRY, MOVE, MOVE, MOVE],
    miniWorker: [WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
    semiWorker: [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    worker: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    miniClaimer: [CLAIM, MOVE],
    claimer: [CLAIM, CLAIM, MOVE, MOVE],
    prober: [TOUGH, TOUGH, MOVE, MOVE],
    miniCannonFodder: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    miniAttacker: [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE]
    },
    partCosts = {
        "work": 100,
        "carry": 50,
        "move": 50,
        "tough": 10,
        "claim": 600,
        "attack": 80
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
        prober: {
            prefix: "Prober",
            body: bodies.prober
        },
        scout: {
            prefix: "Scout",
            body: bodies.scout
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
            },
            claimer: {
                prefix: "Claimer",
                body: bodies.miniClaimer
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
            },
            claimer: {
                prefix: "Claimer",
                body: bodies.claimer
            },
            attacker: {
                prefix: "Attacker",
                body: bodies.miniAttacker
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
            },
            claimer: {
                prefix: "Claimer",
                body: bodies.claimer
            }, 
            cannonfodder: {
                prefix: "Cannonfodder",
                body: bodies.miniCannonFodder
            },
            attacker: {
                prefix: "Attacker",
                body: bodies.miniAttacker
            }
        }
    },
    maxLevel = 5;

module.exports = {
    get: function(level) {
        return _.extend({}, defaultRoles, roles[Math.min(level.id, maxLevel)]);
    },
    body: function(bodyName) {
        return bodies[bodyName];
    },
    bodyCost: function(bodyName) {
        return _.sum(bodies[bodyName], function(partType) { return partCosts[partType]; });
    },
    parts: function(bodyName, partType) {
        if (partType) {
            console.log(JSON.stringify(_.countBy(bodies[bodyName], function (bn) { return bn; })));
            return _.countBy(bodies[bodyName])[partType];
        } else {
            return bodies[bodyName].length;
        }
    }
};
