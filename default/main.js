require("extensions.creep");
require("extensions.room");
require("extensions.spawn");
require("extensions.roomobject");
require("extensions.roomobject.dibs");
require("extensions.container");
require("extensions.resource");
require("extensions.source");
require("extensions.storage");
require("extensions.link");

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
        scout: require("role.scout"),
        prober: require("role.prober"),
        cannonfodder: require("role.cannonfodder"),
        attacker: require("role.attacker")
    },
    main = {},
    utils = require("game.utils"),
    memInit = {
        room: require("memory.room"),
        groups: require("memory.groups")
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

function linkAi(room) {
    var links = room.find(FIND_MY_STRUCTURES, {filter:function (structure) { return structure.structureType === STRUCTURE_LINK; }}),
        link,
        memory,
        targetId,
        target,
        i;
    for(i = 0; i<links.length; i++) {
        link = links[i];        
        if (link) {
            memory = Memory.links[link.id];
            targetId = memory ? memory.target : null;
            target = Game.getObjectById(targetId);
            if (target && link.cooldown <= 0 && link.energy > 0 && target.energy < target.energyCapacity) {
                link.transferEnergy(target);
            }
        }
    }
}

function reportProgress(room) {
    if (!room || !room.controller) {
        return;
    }
    if (!room.memory.progress) {
        room.memory.progress = {
            amount: room.controller.progress,
            prevTick: Game.time
        };
    } else {
        if (room.memory.progress.amount < room.controller.progress - 1000) {
            console.log(
                room.name + " " + 
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
        if (creep.room.energyAvailable < creep.room.energyCapacityAvailable && (creep.memory.allowRefillRoom)) { 
            roles["distributor"].run(creep);
        } else if (role) {
            role.run(creep);
        }
    }
}

module.exports.loop = function () {
    var key;

    if (!Memory.lastReset || (Game.time - Memory.lastReset) > 1500) {
        console.log("resetting dibs in all rooms");
        for (key in Game.rooms) {
            Utils.resetDibs(key);
        }
        Memory.lastReset = Game.time;
    }

    memInit.groups.init();

    for(key in Game.rooms) {
        memInit.room.init(Game.rooms[key]);
        Memory.rooms[key].upgraded = 0;
        
        towerAi(Game.rooms[key]);
        linkAi(Game.rooms[key]);

        if (Game.rooms[key].mainSpawn()) {
            creatureFactory.create(Game.rooms[key].mainSpawn());
        }
        
        reportProgress(Game.rooms[key]);
    }

    runCreeps();
}
