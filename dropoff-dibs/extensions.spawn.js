StructureSpawn.prototype.closestSourceId = function() {
    var roomMemory = this.room.memory.spawns[this.id];
    if (roomMemory && roomMemory.pathsByLength) {
        return roomMemory.pathsByLength[0].id;
    }
    return null;
}

StructureSpawn.prototype.closestSource = function() {
    return Game.getObjectById(this.closestSourceId());
}