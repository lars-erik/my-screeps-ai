require("./extensions.room");

let strategies = require("strategies");
let roles = {
    harvester: require("roles.harvester"),
    upgrader: require("roles.upgrader")
};

function executeBuildingStrategy() {
    let strategy = strategies.create();
    strategy.execute();
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