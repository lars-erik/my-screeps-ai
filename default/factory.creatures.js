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
        
        for(pi = 0; pi<level.priority.length; pi++) {
            priority = level.priority[pi];
            role = roles[priority.role];
            for(ci = 1; ci<=priority.count; ci++) {
                creep = Game.creeps[role.prefix + " " + ci];
                if (!creep) {
                    name = role.prefix + " " + ci;
                    defaultMemory = { level:level.id, role:priority.role };
                    if (spawn.createCreep(role.body, name, _.extend(defaultMemory, role.memory)) == name) {
                        console.log("Created creature " + name + " with level " + level.id);
                    }
                    return;
                }
            }
        }
    }
};