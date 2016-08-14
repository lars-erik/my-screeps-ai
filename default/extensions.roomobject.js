RoomObject.prototype.closestSource = function () {
    return this.pos.findClosestByPath(FIND_SOURCES,{filter: (source) => source.energy > 0 });
};

