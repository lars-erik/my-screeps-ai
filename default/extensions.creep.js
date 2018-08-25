
Creep.prototype.reserve = function(pos) {
    const key = pos.x + "," + pos.y;
    const reservations = _.filter(this.room.reservations[key]);
    if (reservations.length === 0) {
        this.room.reservations[key] = this.name;
        return true;
    }
    return false;
}