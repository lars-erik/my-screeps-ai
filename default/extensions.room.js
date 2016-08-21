Room.prototype.isFull = function() {
    var towers = this.find(FIND_STRUCTURES, {filter:function(structure) {
        return structure.structureType == STRUCTURE_TOWER &&
               structure.energy < structure.energyCapacity;
    ;}});
    
    return this.energyAvailable === this.energyCapacityAvailable && towers.length === 0;
}

Room.prototype.isEmpty = function() {
    return this.energyAvailable === 0;
}

Room.prototype.creepCount = function() {
    var creeplen = 0;
    for (var key in Game.creeps) {
        if (Game.creeps[key].room === this) {
            creeplen++;
        }
    }
    return creeplen;
}

Room.prototype.creepMax = function() {
    var priority = this.memory.level ? this.memory.levels[this.memory.level].priority : [],
        roles = {},
        priorityRole,
        role,
        roleName;
    for (var i = 0; i < priority.length; i++) {
        roleName = priority[i].role;
        priorityRole = priority[i];
        role = roles[roleName];
        if (!role) {
            roles[roleName] = _.extend({},priority[i]);
        } else {
            role.count = Math.max(priorityRole.count, role.count);
        }
    }
    if (_.sumBy) {
        return _.sumBy(roles, function(role) { return role.count; });
    } else {
        return 0;
    }
}

Room.prototype.creepComplete = function() {
    return this.creepCount() >= this.creepMax();
}