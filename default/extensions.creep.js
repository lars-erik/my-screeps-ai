Creep.prototype.isFull = function() {
    return _.sum(this.carry) === this.carryCapacity;
}

Creep.prototype.isEmpty = function() {
    return _.sum(this.carry) === 0;
}

Creep.prototype.affinityId = function() {
    return this.room.memory.affinities[this.memory.role] || this.memory.affinity;
}

Creep.prototype.affinity = function() {
    return Game.getObjectById(this.affinityId());
}