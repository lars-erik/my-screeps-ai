function countCreeps(creeps, role) {
    return _.filter(creeps, x => x.memory.role === role).length;
}

const MaxBuilders = 1;

let level2 = {
    execute(room) {
        let extensionCount = room.find(FIND_STRUCTURES, {filter:{structureType:STRUCTURE_EXTENSION}}).length;
        let spawn = room.find(FIND_STRUCTURES, {filter: {structureType:STRUCTURE_SPAWN}})[0];
        if (extensionCount < 5) {
            let tries = 0;
            let pos = {
                x: spawn.pos.x - 2,
                y: spawn.pos.y - 2
            };
            let result = room.createConstructionSite(pos.x, pos.y, STRUCTURE_EXTENSION);
        } 

        let spawns = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN, my:true}});
        let creeps = room.find(FIND_CREEPS, {filter: {my:true}});

        for(let spawnIndex in spawns) {
            let spawn = spawns[spawnIndex];
            if (countCreeps(creeps, "builder") < MaxBuilders && room.energyAvailable >= 150) {
                spawn.spawnCreep([WORK,CARRY,MOVE], "Builder" + Game.time, {memory:{role:"builder"}});
            }
        }

        Strategies.room.level1.execute();
    }
}

module.exports = level2;