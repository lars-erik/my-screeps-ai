require("./extensions");
global.Strategies = require("strategies");

let roles = {
    harvester: require("roles.harvester"),
    upgrader: require("roles.upgrader"),
    builder: require("roles.builder")
};

function executeBuildingStrategy() {
    for(let roomIndex in Game.rooms) {
        let room = Game.rooms[roomIndex];
        room.execute();
    }
}

function runCreeps() {
    for(let creepIndex in Game.creeps) {
        let creep = Game.creeps[creepIndex];
        // roles[creep.memory.role].execute(creep);
        creep.selectTask();
        creep.run();
    }
}

function cleanup() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    for(var roomKey in Memory.rooms) {
        let roomMemory = Memory.rooms[roomKey];
        for(var reservationKey in roomMemory.reservations) {
            if (!Game.creeps[roomMemory.reservations[reservationKey]]) {
                delete roomMemory.reservations[reservationKey];
            }
        }
    }
}

function loop() {
    executeBuildingStrategy();
    runCreeps();
    cleanup();
}

module.exports = {
    loop: loop
};