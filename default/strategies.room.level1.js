const MaxHarvesters = 2
const MaxUpgraders = 4

function countCreeps(creeps) {
    return creeps.length;
}

const level1 = {

    get name() {
        return "level1";
    },

    spawnCreeps(room) {
        let spawns = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN, my:true}});
        let sources = room.find(FIND_SOURCES);
        let creeps = room.find(FIND_CREEPS, {filter: {my:true}});
        let freePlains = _.sum(_.map(sources, s => s.plains.length));

        for(let spawnIndex in spawns) {
            let spawn = spawns[spawnIndex];
            if (countCreeps(creeps) < (freePlains * 1.5) && room.energyAvailable >= 150) {
                spawn.spawnCreep([WORK,CARRY,MOVE], "Worker" + Game.time);
            }
        }
    },

    execute(room) {
        this.spawnCreeps(room);   
    }
}

module.exports = level1;