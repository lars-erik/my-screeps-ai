require("./extensions.room");
global.Strategies = require("strategies");

let roles = {
    harvester: require("roles.harvester"),
    upgrader: require("roles.upgrader")
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
        roles[creep.memory.role].execute(creep);
    }
}

function loop() {
    executeBuildingStrategy();
    runCreeps();
}

module.exports = {
    loop: loop
};