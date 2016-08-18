var levelFactory = require("factory.levels"),
    roleFactory = require("factory.roles");

StructureSpawn.prototype.closestSourceId = function () {
    var roomMemory = this.room.memory.spawns[this.id];
    if (roomMemory && roomMemory.pathsByLength) {
        return roomMemory.pathsByLength[0].id;
    }
    return null;
}

StructureSpawn.prototype.closestSource = function () {
    return Game.getObjectById(this.closestSourceId());
}

StructureSpawn.prototype.createRoleCreep = function (roleName, level) {
    var self = this,
        roles,
        role,
        defaultMemory,
        name;
    level = level ? levelFactory.getById(level) : levelFactory.get(room),
    defaultMemory = { level: level, role: roleName };
    roles = roleFactory.get(level);
    role = roles[roleName];
    if (!role) {
        return -100;
    }
    name = role.prefix + " " + Number(_.filter(Game.creeps, function(creep) {
        return creep.name.indexOf(self.name) === 0 && creep.memory.role === roleName;
    }).length) + 1;

    var result = this.createCreep(
        role.body, 
        name, 
        _.extend(defaultMemory, role.memory, Memory.creeps[name], { level: level.id, role: role })
    );

    return result;
}