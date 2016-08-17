require("extensions.creep");
require("extensions.room");
require("extensions.spawn");
require("extensions.roomobject");
require("extensions.roomobject.dibs");
require("extensions.container");
require("extensions.resource");
require("extensions.source");

var roles = {
        harvester: require('role.harvester'),
        upgrader: require('role.upgrader'),
        builder: require('role.builder'),
        heralder: require('role.heralder'),
        claimer: require("role.claimer"),
        dropper: require("role.dropper"),
        transporter: require("role.transporter"),
        renewer: require("role.renewer"),
        recycled: require("role.recycled"),
        distributor: require("role.distributor"),
        scout: require("role.scout")
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
            } else if (tower.energy > tower.energyCapacity * .8) {
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
//        if (creep.memory.role !== "dropper" && creep.memory.role !== "scout" && creep.room.creepComplete() && (creep.ticksToLive < 100 || creep.memory.renewing)) {
//            roles.renewer.run(creep);
//        } else 
        if (creep.room.energyAvailable < creep.room.energyCapacityAvailable && (
            creep.memory.allowRefillRoom || 
            (creep.memory.role != "dropper" && creep.memory.role != "heralder" && creep.memory.role != "scout")
            )) { //  || creep.memory.role === "builder"
            roles["distributor"].run(creep);
        } else if (role) {
            role.run(creep);
        }
    }
}

module.exports.loop = function () {

    utils.init(Game);

    for(var key in Game.rooms) {
        memInit.room.init(Game.rooms[key]);
        if (Game.rooms[key].mainSpawn()) {
            //creatureFactory.create(Game.rooms[key].mainSpawn());
        }
        towerAi(Game.rooms[key]);
        reportProgress(Game.rooms[key]);
    }

    runCreeps();
}
