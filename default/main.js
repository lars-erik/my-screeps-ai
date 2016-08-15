var roles = {
        harvester: require('role.harvester'),
        upgrader: require('role.upgrader'),
        builder: require('role.builder'),
        heralder: require('role.heralder'),
        claimer: require("role.claimer"),
        dropper: require("role.dropper"),
        transporter: require("role.transporter")
        //,soldier: require("role.soldier")
    },
    roleNames = {
        harvester: "Harvester",
        heralder: "Heralder",
        upgrader: "Upgrader",
        builder: "Builder"
    },
    main = {};
    
// and back again

function getLevel() {
    return Game.rooms[Game.spawns.Spawn.pos.roomName].controller.level;
}

function createCreep(name, role, affinity) {
    var capacity = main.room.energyCapacityAvailable;
    
    var body;
    if (capacity >= 1300) {
        if (role == "harvester") {
            body = [WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        } else {
            body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK
                , CARRY, CARRY
                , MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                , MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
        }
    } else if (capacity >= 750) {
        if (role == "harvester") {
            body = [WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        } else {
            body = [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
    } else if (capacity >= 700) {
        body = [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
    } else if (capacity >= 550) {
        body = [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE];
    } else if (capacity >= 500) {
        body = [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
    } else if (capacity >= 300) {
        body = [WORK, WORK, CARRY, MOVE];
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
    var result = main.spawn.createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], name, {
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
    for (var i = 1; i <= count; i++) {
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

function towerAi(room) {
    var towers = room.find(FIND_MY_STRUCTURES, { filter: function (structure) { return structure.structureType === STRUCTURE_TOWER; } }),
        tower,
        i;
    for (i = 0; i < towers.length; i++) {
        tower = towers[i];
        if (tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
            
            if (tower.energy > tower.energyCapacity * .8) {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (structure) {
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

function createDropper(name, affinity, loadOff) {
    var result = Game.spawns.Spawn.createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], name, { role: "dropper", affinity: affinity, loadOff: loadOff });
    if (result == name) {
        console.log("Created creep " + name);
        return true;
    }
    return false;
}

function createSoldier(name) {
    var result = Game.spawns.Spawn.createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], name, { role: "soldier" });
    if (result == name) {
        console.log("Created soldier " + name)
        return true;
    }
    return false;
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
    if (!wasCreated && !Game.creeps["Dropper 1"]) wasCreated = createDropper("Dropper 1", "579fa8710700be0674d2d9cd", "57ab415c4dddc2a3298b6c37");
    if (!wasCreated && !Game.creeps["Transporter 1"]) wasCreated = createTransporter("Transporter 1", "57ab415c4dddc2a3298b6c37", "57ac6d9c335168207751f1f5");
    if (!wasCreated && !Game.creeps["Dropper 2"]) wasCreated = createDropper("Dropper 2", "579fa8710700be0674d2d9ce", "57ab83cc61838c5e0729a3b7");
    if (!wasCreated && !Game.creeps["Transporter 2"]) wasCreated = createTransporter("Transporter 2", "57ab83cc61838c5e0729a3b7", "57ac815400d93c7d39333830");
    if (!wasCreated) wasCreated = createCreeps("builder", 3);
    //if (!wasCreated && !Game.creeps["Transporter 3"]) wasCreated = createTransporter("Transporter 3", "57ab415c4dddc2a3298b6c37", "57ac6d9c335168207751f1f5");
    if (!wasCreated && !Game.creeps["Transporter 4"]) wasCreated = createTransporter("Transporter 4", "57ac6d9c335168207751f1f5", "57af29c7d519a84b334f8e9e");
//    if (!wasCreated && !Game.creeps["Transporter 5"]) wasCreated = createTransporter("Transporter 5", "57ac6d9c335168207751f1f5", "57af29c7d519a84b334f8e9e");
    if (!wasCreated) wasCreated = createCreeps("builder", 2);
    if (!wasCreated) wasCreated = createCreeps("upgrader", 2);
//    if (!wasCreated) wasCreated = createSoldier("Soldier 1");
//    if (!wasCreated) wasCreated = createSoldier("Soldier 2");
}

function logControllerProgress(room) {
    if (!room.memory.controllerProgress) {
        room.memory.controllerProgress = room.controller.progress;
    }
    if (room.controller.progress > room.memory.controllerProgress + 100) {
        console.log("CTRL: " + room.controller.progress + "/" + room.controller.progressTotal);
        room.memory.controllerProgress = room.controller.progress;
    }
}

module.exports.loop = function () {
    
    initMain();
    
    Memory.info = {
        energy: main.room.energyAvailable,
        main: main
    };
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name],
            role = creep ? roles[creep.memory.role] : null;
        if (!creep) {
            delete Game.creeps[name];
        }
        if (creep.ticksToLive == 1) {
            roles.heralder.add(name + " dies! :(");
            console.log(name + " dies! :(");
        }
        if ((creep.memory.role == "builder" || creep.memory.role == "upgrader") &&
            main.room.energyAvailable < main.room.energyCapacityAvailable) {
            roles["harvester"].run(creep);
        } else if (role) {
            role.run(creep);
        }
    }
    
    createAllCreeps();
    
    towerAi(main.room);

    logControllerProgress(main.room);
}
