Object.defineProperty(
    Creep.prototype,
    "reservation", {
        get: function() {
            return this.memory.reservation;
        },
        configurable: true,
        enumerable: false
    } 
)

Creep.prototype.reserve = function(pos) {
    const key = pos.x + "," + pos.y;
    const reservations = _.filter(this.room.reservations[key]);
    if (reservations.length === 0) {
        this.room.reservations[key] = this.name;
        this.memory.reservation = pos;
        return true;
    }
    return false;
}

Creep.prototype.unreserve = function() {
    if (this.reservation) {
        let key = this.reservation.x + "," + this.reservation.y;
        delete this.room.reservations[key];
        delete this.memory.reservation;
    }
}

Creep.prototype.moveToTarget = function() {
    if (this.reservation) {
        if (this.pos.x === this.reservation.x && this.pos.y === this.reservation.y) {
            this.unreserve();
            return;
        }

        this.moveTo(this.reservation.x, this.reservation.y);
    }
}