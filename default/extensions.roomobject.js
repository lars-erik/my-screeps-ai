RoomObject.prototype.closestSource = function () {
    return this.pos.findClosestByPath(FIND_SOURCES,{filter: (source) => source.energyAvailable > 0 });
};