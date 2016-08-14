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
        transporter: require("role.transporter")
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

function towerAi() {
    var tower = Game.getObjectById('57ab1d58a572e3a75721b2a2');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) { return structure.hits < structure.hitsMax; }
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
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
        if (creep.room.energyAvailable < creep.room.energyCapacityAvailable && (
            creep.memory.role === "builder" || creep.memory.role === "upgrader")) {
            roles["harvester"].run(creep);
        } else if (role) {
            role.run(creep);
        }
    }
}

module.exports.loop = function () {

    utils.init(Game);

    for(var key in Game.rooms) {
        memInit.room.init(Game.rooms[key]);
        creatureFactory.create(Game.rooms[key].mainSpawn());
    }

    runCreeps();

    /*
    towerAi();
    */
}