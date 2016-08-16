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
