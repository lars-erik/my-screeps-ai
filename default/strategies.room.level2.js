function countCreeps(creeps, role) {
    return _.filter(creeps, x => x.memory.role === role).length;
}

const MaxBuilders = 1;

function buildExtensions(room) {
    let extensionCount = room.find(FIND_STRUCTURES, {filter:{structureType:STRUCTURE_EXTENSION}}).length;
    let spawn = room.find(FIND_STRUCTURES, {filter: {structureType:STRUCTURE_SPAWN}})[0];
    if (extensionCount < 5) {
        let tries = 0;
        for (let y = -2; y <= 2; y += 2) {
            for (let x = -2; x <= 2; x += 2) {
                let result = room.createConstructionSite(x, y, STRUCTURE_EXTENSION);
            }
        }
    } 
}

function spawnBuilders(room) {
    let spawns = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN, my:true}});
    let creeps = room.find(FIND_CREEPS, {filter: {my:true}});

    for(let spawnIndex in spawns) {
        let spawn = spawns[spawnIndex];
        if (countCreeps(creeps, "builder") < MaxBuilders && room.energyAvailable >= 150) {
            spawn.spawnCreep([WORK,CARRY,MOVE], "Builder" + Game.time, {memory:{role:"builder"}});
        }
    }
}

let level2 = {
    execute(room) {

        buildExtensions(room);
        spawnBuilders(room);

        Strategies.room.level1.execute();
    }
}

module.exports = level2;