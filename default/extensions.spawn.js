StructureSpawn.prototype.closestSourceId = function() {
    return spawn.memory.pathsByLength[0].id;
}

StructureSpawn.prototype.closestSource = function() {
    return Game.getObjectById(this.closestSourceId());
}