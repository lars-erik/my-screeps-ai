let _ = require("lodash");
const MaxHarvesters = 2
const MaxUpgraders = 4

function countCreeps(creeps, role) {
    return _.filter(creeps, x => x.memory.role === role).length;
}

class Level1 {

    get name() {
        return "level1";
    } 

    spawnCreeps() {
        for(let roomName in Game.rooms) {
            let room = Game.rooms[roomName];
            let spawns = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN, my:true}});
            let creeps = room.find(FIND_CREEPS, {filter: {my:true}});

            for(let spawnIndex in spawns) {
                let spawn = spawns[spawnIndex];
                if (countCreeps(creeps, "harvester") < MaxHarvesters && room.energyAvailable >= 150) {
                    spawn.spawnCreep([WORK,CARRY,MOVE], "Harvester" + Game.time, {memory:{role:"harvester"}});
                } else if (countCreeps(creeps, "upgrader") < MaxUpgraders && room.energyAvailable >= 150) {
                    spawn.spawnCreep([WORK,CARRY,MOVE], "Upgrader" + Game.time, {memory:{role:"upgrader"}});
                }
            }
        }
    }

    evaluateLevel() {

    }

    execute() {
        this.spawnCreeps();
        this.evaluateLevel();        
    }
}

module.exports = Level1;