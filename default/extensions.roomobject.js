RoomObject.prototype.closestSource = function () {
    return this.pos.findClosestByPath(FIND_SOURCES,{filter: (source) => source.energy > 0 });
};

RoomObject.prototype.idAndPos = function () {
    return this.id + "(" + this.pos.x + "," + this.pos.y + ")";
};

