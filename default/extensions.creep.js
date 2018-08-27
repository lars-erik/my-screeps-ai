const taskTypes = require("./tasks"); 

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
        this.unreserve();
        this.room.reservations[key] = this.name;
        this.memory.reservation = pos;
        delete this._distanceToTarget;
        return true;
    }
    return false;
}

Creep.prototype.unreserve = function() {
    if (this.reservation) {
        let key = this.reservation.x + "," + this.reservation.y;
        delete this.room.reservations[key];
        delete this.memory.reservation;
        delete this._distanceToTarget;
    }
}

Object.defineProperty(
    Creep.prototype,
    "distanceToTarget", {
        get() {
            if (this._distanceToTarget) {
                return this._distanceToTarget;
            }
            if (!this.reservation) {
                return -1;
            }
            const distance = this.pos.getRangeTo(this.reservation);
            return this._distanceToTarget = distance;
        }
    }
)

Creep.prototype.moveToTarget = function() {
    if (this.reservation) {
        if (this.pos.x === this.reservation.x && this.pos.y === this.reservation.y) {
            return;
        }

        this.moveTo(this.reservation.x, this.reservation.y);
    }
}

function findPrioritizedTask(creep) {
    if (creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
        return {
            type: "dropoff"
        };
    } else if (creep.carry.energy === 0) {
        return {
            type: "harvest"
        };
    } else {
        return {
            type: "upgrade"
        };
    }
    return null;
}

Creep.prototype.selectTask = function() {
    let taskData = this.memory.task;
    if (taskData && taskData.type) {
        let task = new taskTypes[taskData.type](this, taskData);
        if (!task.done()) {
            this.task = task;
        } else {
            this.task = null;
        }
    } 
    if (!this.task) {
        taskData = findPrioritizedTask(this);
        
        this.task = new taskTypes[taskData.type](this, taskData);
    }
    this.memory.task = taskData;
}

Creep.prototype.run = function() {
    if (this.task) {
        this.task.execute(this, this.memory.task);
    }
}
