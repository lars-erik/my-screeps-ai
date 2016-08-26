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
        
        function tryCreateCreep(pri, groupName, creepName) {
            defaultMemory = { level: level.id, role: pri.role, group: groupName };
            creepName = creepName || name;
            var result = spawn.createCreep(
                pri.body ? roleFactory.body(pri.body) : role.body, 
                creepName, 
                _.extend({}, Memory.creeps[name], defaultMemory)
            );
            if (result === creepName) {
                console.log("Created creature " + creepName + " with level " + level.id);
                Memory.rooms[room.name].nextCreep = null;
                return true;
            } else {
                //console.log("Couldn't create creature " + name + " with level " + level.id + " due to " + result);
                Memory.rooms[room.name].nextCreep = name.substring(room.name.length + 1);
            }
            return false;
        }
        
        function prohibitRole() {
            return priority.role === "attacker" && room.fullness() > .75;
        }
        
        function createIfNew(pri, groupName) {
            var creepName,
                extIsClone;
            creep = Game.creeps[name] || Game.creeps[name + ".2"];
            if (!creep) {
                if (prohibitRole()) {
                    return true;
                }

                tryCreateCreep(pri, groupName);
                return true;
            } else if (["dropper"].indexOf(creep.memory.role) > -1 && creep.ticksToLive < 50) {
                extIsClone = creep.name.indexOf(".2") === creep.name.length - 3;
                creepName = extIsClone ? name : name + ".2";
                if (tryCreateCreep(pri, groupName, creepName)) {
                    if (!extIsClone) {
                        Memory.creeps[creepName] = Memory.creeps[name];
                    }
                }
            } else {
                return false;
            }
        }
        
        function createRolePriority(pri, groupName) {
            var startAt = attemptedRoles[pri.role];
            role = roles[pri.role];
            
            if (!role) {
                return;
            }
            
            if (!startAt) {
                startAt = attemptedRoles[pri.role] = 0;
            }

            for (creepNumber = startAt + 1; creepNumber <= startAt + pri.count; creepNumber++) {
                attemptedRoles[pri.role]++;
                
                name = spawn.room.name + " " + role.prefix + " " + creepNumber;
                if (createIfNew(pri, groupName)) {
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
                    //console.log(room.name + " eval " + priority.groupName + " " + priority.group[gpi].role);
                    if (!priority.group[gpi].disabled && createRolePriority(priority.group[gpi], priority.groupName)) {
                        return true;
                    }
                }
            } else {
                //console.log(room.name + " eval " + priority.role);
                if (createRolePriority(priority)) {
                    return true;
                }
            }
        }
    }
};