require("extensions.creep");
require("extensions.room");
require("extensions.spawn");
require("extensions.roomobject");
require("extensions.roomobject.dibs");
require("extensions.container");
require("extensions.resource");

var roles = {
        harvester: require('role.harvester'),
        upgrader: require('role.upgrader'),
        builder: require('role.builder'),
        heralder: require('role.heralder'),
        claimer: require("role.claimer"),
        dropper: require("role.dropper"),
        transporter: require("role.transporter"),
        renewer: require("role.renewer")
    },
    roleNames = {
        harvester: "Harvester",
        heralder: "Heralder",
        upgrader: "Upgrader",
        builder: "Builder"
    },
    main = {},
    utils = require("game.utils"),
    memInit = {
        room: require("memory.room")
    },
    creatureFactory = require("factory.creatures");

function towerAi(room) {
    var towers = room.find(FIND_MY_STRUCTURES, {filter:function (structure) { return structure.structureType === STRUCTURE_TOWER; }}),
        tower,
        i;
    for(i = 0; i<towers.length; i++) {
        tower = towers[i];        
        if (tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }

            if (tower.energy > tower.energyCapacity * .8) {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(structure) {
                        return structure.hits < structure.hitsMax;
                    }
                });
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    }
}

function runCreeps() {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name],
            role = creep ? roles[creep.memory.role] : null;
        if (!creep) {
            delete Game.creeps[name];
        }
        if (creep.ticksToLive === 1) {
            roles.heralder.add(name + " dies! :(");
            console.log(name + " dies! :(");
        }
        if (creep.memory.role !== "dropper" && (creep.ticksToLive < 100 || creep.memory.renewing)) {
            roles.renewer.run(creep);
        } else if (creep.room.energyAvailable < creep.room.energyCapacityAvailable && (
            creep.memory.allowRefillRoom || creep.memory.role === "builder" || creep.memory.role === "upgrader")) {
            roles["harvester"].run(creep);
        } else if (role) {
            role.run(creep);
        }
    }
}

function reportProgress(room) {
    if (!room.memory.progress) {
        room.memory.progress = {
            amount: room.controller.progress,
            prevTick: Game.time
        };
    } else {
        if (room.memory.progress.amount < room.controller.progress - 1000) {
            console.log(
                (room.controller.progress - room.memory.progress.amount) +
                " of " + room.controller.progress +
                "/" + room.controller.progressTotal + " in " + 
                (Game.time - room.memory.progress.prevTick + " ticks")
                );
            room.memory.progress = {
                amount: room.controller.progress,
                prevTick: Game.time
            };
        }
    }
}

module.exports.loop = function () {

    utils.init(Game);

    for(var key in Game.rooms) {
        memInit.room.init(Game.rooms[key]);
        creatureFactory.create(Game.rooms[key].mainSpawn());
        towerAi(Game.rooms[key]);
        reportProgress(Game.rooms[key]);
    }

    runCreeps();
}
