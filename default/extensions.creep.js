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
        this.room.unreserve(this.reservation);
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
            const distance = this.pos.getRangeTo(this.reservation.x, this.reservation.y);
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
    if (creep.carry.energy > 0 && creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
        return {
            type: "dropoff"
        };
    } else if (creep.carry.energy > 0 && creep.room.constructionSites.length > 0 && creep.room.controller.ticksToDowngrade >= 5000) {
        return {
            type: "build"
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
            this.unreserve();
        }
    } 
    if (!this.task) {
        taskData = findPrioritizedTask(this);
        
        this.task = new taskTypes[taskData.type](this, taskData);
    }

    if (this.room.visual) {
        let text = "Idle";
        if (this.task) {
            text = taskData.type.substr(0, 1);
        }
        this.room.visual.text(text, this.pos.x, this.pos.y - 1)
    }

    this.memory.task = taskData;
}

Creep.prototype.run = function() {
    if (this.task) {
        this.task.run(this, this.memory.task);
    }

    if (this.ticksToLive <= 1) {
        this.unreserve();
        delete this.memory;
        delete Memory.creeps[this.name];
        this.suicide();
    }
}
