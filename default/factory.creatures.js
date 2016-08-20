var roleFactory = require("factory.roles"),
    levelFactory = require("factory.levels");

module.exports = {
    create: function(spawn) {
        var room = spawn.room,
            level = levelFactory.get(room),
            roles = roleFactory.get(level),
            priority,
            pi,
            ci,
            role,
            creep,
            name,
            defaultMemory;

        if (!level.priority) {
            console.log(room.name + " doesn't have level priority");
            return;
        }
        
        for(pi = 0; pi<level.priority.length; pi++) {
            priority = level.priority[pi];
            role = roles[priority.role];
            for(ci = 1; ci<=priority.count; ci++) {
                name = spawn.room.name + " " + role.prefix + " " + ci;
                creep = Game.creeps[name];
                if (!creep) {
                    if (priority.role === "attacker" && room.energyAvailable < 1380) {
                        return;
                    }

                    defaultMemory = { level: level.id, role: priority.role };
                    var result = spawn.createCreep(
                        role.body, 
                        name, 
                        _.extend(defaultMemory, role.memory, Memory.creeps[name], { level: level.id, role: priority.role })
                    );
                    if (result === name) {
                        console.log("Created creature " + name + " with level " + level.id);
                    } else {
                        //console.log("Couldn't create creature " + name + " with level " + level.id + " due to " + result);
                    }

                    return;
                }
            }
        }
    }
};