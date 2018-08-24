let _ = require("lodash");

class Initial {
    get name() {
        return "Initial";
    } 

    spawnCreeps() {
        for(let roomName in Game.rooms) {
            let room = Game.rooms[roomName];
            let spawns = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN, my:true}});
            let creeps = room.find(FIND_CREEPS, {filter: {my:true}});

            for(let spawnIndex in spawns) {
                let spawn = spawns[spawnIndex];
                console.log(spawn.name);
                if (_.filter(creeps, x => x.memory.role === "harvester").length < 2 && room.energyAvailable >= 150) {
                    spawn.spawnCreep([WORK,CARRY,MOVE], "Harvester" + Game.time, {memory:{role:"harvester"}});
                } else if (_.filter(creeps, x => x.memory.role === "upgrader".length) < 2 && room.energyAvailable >= 150) {
                    spawn.spawnCreep([WORK,CARRY,MOVE], "Upgrader" + Game.time, {memory:{role:"upgrader"}});
                }

            }
        }
    }

    execute() {
        this.spawnCreeps();        
    }
}

module.exports = Initial;