StructureContainer.prototype.yield = function(creep) {
    return creep.withdraw(this, RESOURCE_ENERGY);
}