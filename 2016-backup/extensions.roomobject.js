RoomObject.prototype.closestSource = function () {
    return (this instanceof Source ? this : null) ||
           this.pos.findInRange(FIND_SOURCES, 1)[0] ||
           this.pos.findClosestByPath(FIND_SOURCES,  { filter: function(source) {
               return source.energy > 0;
           }});
};

RoomObject.prototype.idAndPos = function () {
    return this.id + " " + this.xy();
};

RoomObject.prototype.xy = function() {
    return "<" + this.pos.x + "," + this.pos.y + ">";
}