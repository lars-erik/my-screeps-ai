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
            return;
        }

        for(pi = 0; pi<level.priority.length; pi++) {
            priority = level.priority[pi];
            role = roles[priority.role];
            for(ci = 1; ci<=priority.count; ci++) {
                creep = Game.creeps[role.prefix + " " + ci];
                if (!creep) {
                    name = role.prefix + " " + ci;
                    defaultMemory = { level: level.id, role: priority.role };
                    var result = spawn.createCreep(
                        role.body, 
                        name, 
                        _.extend(defaultMemory, role.memory, Memory.creeps[name], { level: level.id })
                    );
                    if (result === name) {
                        console.log("Created creature " + name + " with level " + level.id);
                    }

                    return;
                }
            }
        }
    }
};