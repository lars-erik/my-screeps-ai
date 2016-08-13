Creep.prototype.isFull = function() {
    return _.sum(this.carry) === this.carryCapacity;
}

Creep.prototype.isEmpty = function() {
    return _.sum(this.carry) === 0;
}

Creep.prototype.affinity = function() {
    return this.room.memory.affinities[this.memory.role] || this.memory.affinity;
}