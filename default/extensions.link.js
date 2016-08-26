StructureLink.prototype.yield = function(creep, resource) {
    return creep.withdraw(this, resource);
}