let strategies = require("strategies");
let roles = {
    harvester: require("roles.harvester"),
    upgrader: require("roles.upgrader")
};

function loop() {
    let strategy = strategies.create();
    strategy.execute();

    for(let creepIndex in Game.creeps) {
        let creep = Game.creeps[creepIndex];
        roles[creep.memory.role].execute(creep);
    }
}

module.exports = {
    loop: loop
};