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
    console.log("hello world");
    for (var key in Game.creeps) {
        if (Game.creeps[key].room === this) {
            creeplen++;
        }
    }
    return creeplen;
}

Room.prototype.creepMax = function() {
    var priorities = this.memory.level ? this.memory.levels[this.memory.level].priority : [],
        total = 0,
        i, j;

    if (this.total > 0) {
        return this.total;
    }

    for (i = 0; i < priorities.length; i++) {
        if (priorities.groupName) {
            for (j = 0; j < priorities[i].group.length; j++) {
                total += priorities[i].group[j].count;
            }
        } else {
            total += priorities[i].count;
        }
    }
    
    this.total = total;
    return total;
}

Room.prototype.creepComplete = function() {
    return this.creepCount() >= this.creepMax();
}