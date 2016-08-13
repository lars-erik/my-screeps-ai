Room.prototype.isFull = function() {
    return this.energyAvailable === this.energyCapacityAvailable;
}

Room.prototype.isEmpty = function() {
    return this.energyAvailable === 0;
}