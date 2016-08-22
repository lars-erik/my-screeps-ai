var roleFactory = require("factory.roles"),
    levelFactory = require("factory.levels");

module.exports = {
    create: function(spawn) {
        var room = spawn.room,
            level = levelFactory.get(room),
            roles = roleFactory.get(level),
            priority,
            pi,
            gpi,
            creepNumber,
            role,
            creep,
            name,
            defaultMemory,
            attemptedRoles = {};
        
        function tryCreateCreep(groupName) {
            defaultMemory = { level: level.id, role: priority.role };
            var result = spawn.createCreep(
                role.body, 
                name, 
                _.extend(defaultMemory, role.memory, Memory.creeps[name], { level: level.id, role: priority.role }) // , group: groupName
            );
            if (result === name) {
                console.log("Created creature " + name + " with level " + level.id);
            } else {
                //console.log("Couldn't create creature " + name + " with level " + level.id + " due to " + result);
            }
        }
        
        function prohibitRole() {
            return priority.role === "attacker" && room.energyAvailable < 1380;
        }
        
        function createIfNew(groupName) {
            creep = Game.creeps[name];
            if (!creep) {
                if (prohibitRole()) {
                    return true;
                }

                tryCreateCreep(groupName);
                return true;
            } else {
                return false;
            }
        }
        
        function createRolePriority(pri, groupName) {
            role = roles[pri.role];
            
            if (!attemptedRoles[pri.role]) {
                attemptedRoles[pri.role] = 1;
            }
            
            for (creepNumber = attemptedRoles[pri.role]; creepNumber <= pri.count; creepNumber++) {
                attemptedRoles[pri.role]++;
                
                name = spawn.room.name + " " + role.prefix + " " + creepNumber;
                if (createIfNew(groupName)) {
                    return true;
                }
            }

            return false;
        }

        if (!level.priority) {
            console.log(room.name + " doesn't have level priority");
            return false;
        }
        
        for(pi = 0; pi<level.priority.length; pi++) {
            priority = level.priority[pi];
            if (priority.group) {
                for (gpi = 0; gpi < priority.group.length; gpi++) {
                    if (createRolePriority(priority.group[gpi], priority.groupName)) {
                        return true;
                    }
                }
            } else {
                if (createRolePriority(priority)) {
                    return true;
                }
            }
        }
    }
};