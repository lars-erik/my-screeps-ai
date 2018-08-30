function countCreeps(creeps, role) {
    return _.filter(creeps, x => x.memory.role === role).length;
}

const MaxBuilders = 1;
const lvl1 = require("./strategies.room.level1");

let level2 = {

    buildExtensions(room) {
        let extensionCount = room.find(FIND_STRUCTURES, {filter:{structureType:STRUCTURE_EXTENSION}}).length;
        let constructionCount = room.find(FIND_MY_CONSTRUCTION_SITES).length;
        let spawn = room.find(FIND_STRUCTURES, {filter: {structureType:STRUCTURE_SPAWN}})[0];
        if (extensionCount + constructionCount < 5) {
            let tries = 0;
            let oks = 0;
            for (let y = -2; y <= 2 && oks < 5; y += 2) {
                for (let x = -2; x <= 2 && oks < 5; x += 2) {
                    let px = spawn.pos.x + x;
                    let py = spawn.pos.y + y;
                    let result = room.createConstructionSite(px, py, STRUCTURE_EXTENSION);
                    if (result === OK) {
                        oks++;
                    }
                }
            }
        } 
    },

    spawnBuilders(room) {
        let spawns = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN, my:true}});
        let sources = room.find(FIND_SOURCES);
        let creeps = room.find(FIND_CREEPS, {filter: {my:true}});
        let freePlains = _.sum(_.map(_.filter(sources, s => s.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length === 0), s => s.plains.length));
        let result = 0;
        for(let spawnIndex in spawns) {
            let spawn = spawns[spawnIndex];
            if (countCreeps(creeps) < Math.floor(freePlains) && room.energyAvailable >= 250) {
                console.log("spawning worker");
                result = spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], "Worker MK2 " + Game.time);
                console.log(result);
                if (result === OK) {
                    return result;
                }
            }
        }
        return result;
    },

    execute(room) {

        this.buildExtensions(room);

        if (room.energyCapacityAvailable >= 500) {
            if (this.spawnBuilders(room) !== OK) {
                lvl1.spawnCreeps(room);
            }
        } else {
            lvl1.spawnCreeps(room);
        }

        lvl1.ensureRoads(room);

    }
}

module.exports = level2;
