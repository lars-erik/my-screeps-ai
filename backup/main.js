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
    main = {};

function getLevel() {
    return Game.rooms[Game.spawns.Spawn.pos.roomName].controller.level;
}

function createCreep(name, role, affinity) {
    var capacity = main.room.energyCapacityAvailable;
    
    var body;
    if (capacity >= 750) {
        if (role == "harvester") {
            body = [WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        } else {
            body =[WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        }
    } else if (capacity >= 700) {
        body =[WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    } else if (capacity >= 550) {
        body =[WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
    } else if (capacity >= 500) {
        body =[WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
    } else if (capacity >= 300) {
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

function createTransporter(name, a, b) {
    var result = main.spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], name, {
        role: "transporter",
        a: a,
        b: b
    });
    if (result == name) {
        console.log("Created creep " + name);
    }
    return result == name;
}

function createCreeps(role, count) {
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

function towerAi() {
    var tower = Game.getObjectById('57ab1d58a572e3a75721b2a2');
    if(tower) {
        if (tower.energy > tower.energyCapacity * .8)
        {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
}

function createDropper(name, affinity) {
    var result = Game.spawns.Spawn.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], name, { role: "dropper", affinity: affinity });
    if (result == name) {
        console.log("Created creep " + name);
    }
    return result == name;
}

function initMain() {
    main.spawn = Game.spawns.Spawn;
    main.room = main.spawn.room;
    main.heralder = roles.heralder;
    
    Game.utils = {
        createDropper: createDropper
    };
}

function createAllCreeps() {
    
    var wasCreated = createCreeps("harvester", 3);
    ensureHeralder();
    if (!wasCreated && !Game.creeps["Dropper 1"]) wasCreated = createDropper("Dropper 1", "579fa8710700be0674d2d9cd");
    if (!wasCreated && !Game.creeps["Transporter 1"]) wasCreated = createTransporter("Transporter 1", "57ab415c4dddc2a3298b6c37", "57ac6d9c335168207751f1f5");
    if (!wasCreated && !Game.creeps["Dropper 2"]) wasCreated = createDropper("Dropper 2", "579fa8710700be0674d2d9ce");
    if (!wasCreated && !Game.creeps["Transporter 2"]) wasCreated = createTransporter("Transporter 2", "57ab83cc61838c5e0729a3b7", "57ac815400d93c7d39333830");
    if (!wasCreated) wasCreated = createCreeps("builder", 4);
    if (!wasCreated) wasCreated = createCreeps("upgrader", 2);

}

module.exports.loop = function () {

    initMain();

    Memory.info = {
        energy: main.room.energyAvailable,
        main: main
    };

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
        if ((creep.memory.role != "dropper" && creep.memory.role != "heralder") &&
            main.room.energyAvailable < main.room.energyCapacityAvailable) {
            roles["harvester"].run(creep);
        } else if (role) {
            role.run(creep);
        }
    }

    createAllCreeps();
    
    towerAi();

}