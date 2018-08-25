var roles = {
        harvester: require('role.harvester'),
        upgrader: require('role.upgrader'),
        builder: require('role.builder'),
        heralder: require('role.heralder'),
        claimer: require("role.claimer"),
        dropper: require("role.dropper")
    },
    roleNames = {
        harvester: "Harvester",
        heralder: "Heralder",
        upgrader: "Upgrader",
        builder: "Builder"
    },
    building = {
        extensions: require("building.extensions")
    },
    creatureFactory = require("factory.creatures"),
    main = {};

function createCreep(name, role, affinity) {
    var capacity = main.room.energyCapacityAvailable,
        energy = main.room.energyAvailable;
    
    var body;
    if (capacity >= 750 && energy >= 750) {
        body =[WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    } else if (capacity >= 700 && energy >= 700) {
        body =[WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    } else if (capacity >= 550 && energy >= 550) {
        body =[WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
    } else if (capacity >= 500 && energy >= 500) {
        body =[WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
    } else if (capacity >= 300 && energy >= 300) {
        body = [WORK,WORK,CARRY,MOVE];
    } else {
        return;
    }
    
    var result = main.spawn.createCreep(body, name, { role: role, affinity: affinity });
    if (result == OK || result == name) {
        roles.heralder.add("Created " + name);
        console.log("Created creep " + name);
    } else if (result == ERR_NOT_ENOUGH_RESOURCES) {
        //console.log("Can't afford creep " + name);
    } else if (result == ERR_BUSY) {
        //console.log("Too busy to build creep " + name);
    } else {
        //console.log("Unexpected error building creep " + name + ": " + result);
    }
}

function createCreepsOfRole(role, count) {
    for (var i = 1; i<=count; i++) {
        var name = roleNames[role] + " " + i;
        if (!Game.creeps[name]) {
            createCreep(name, role);
            return true;
        }
    }
    return false;
}

function ensureHeralder() {
    if (!Game.creeps["Heralder"]) {
        main.spawn.createCreep([MOVE], "Heralder", { role: "heralder" });
    }
}

function runTowers() {
    var tower = Game.getObjectById('57ab1d58a572e3a75721b2a2');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
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

function createDropper(name, affinity) {
    var result = main.spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], name, { role: "dropper", affinity: affinity });
    return result == name;
}

function initMain(spawn) {
    main.spawn = spawn;
    main.room = spawn.room;

    Game.utils = {
        createDropper: createDropper
    };
}

function runCreeps() {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name],
            role = creep ? roles[creep.memory.role] : null;
        if (!creep) {
            delete Game.creeps[name];
            delete Memory.creeps[name];
        }
        if (creep.ticksToLive == 1) {
            roles.heralder.add(name + " dies! :(");
            console.log(name + " dies! :(");
        }
        if (role) {
            role.run(creep);
        }
    }
}

function createCreeps() {
    var wasCreated = createCreepsOfRole("harvester", 3);
    if (!wasCreated) ensureHeralder();
    if (!wasCreated) wasCreated = createCreepsOfRole("builder", 3);
    if (!wasCreated) wasCreated = createCreepsOfRole("upgrader", 3);
    
    if (false)
    {
        if (!wasCreated && !Game.creeps["Dropper 1"]) wasCreated = createDropper("Dropper 1", "579fa8710700be0674d2d9cd");
        if (!wasCreated && !Game.creeps["Dropper 2"]) wasCreated = createDropper("Dropper 2", "579fa8710700be0674d2d9ce");
    }
}

module.exports.loop = function () {

    for(var roomKey in Game.rooms)
    {
        var room = Game.rooms[roomKey];
        var spawns = room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_SPAWN });
        var spawn = spawns[0];

        initMain(spawn);
    //    createCreeps();
        creatureFactory.create(spawn);
        
        building.extensions.build(spawn);
    }

    console.log("Hello world!");

    runCreeps();
    
    // TODO: Build extensions
    
    runTowers();

}