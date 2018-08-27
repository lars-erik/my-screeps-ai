module.exports = class DropOff {
    constructor(creep, taskData) {
        this.creep = creep;
        this.taskData = taskData;
    }
    
    done() {
        return this.creep.carry.energy < this.creep.carryCapacity || !this.taskData.goal;
    }

    run() {
        if (!this.taskData.goal || !this.creep.reservation) {
            let closestDropOff = this.creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: s => {
                return s.energyCapacity && (s.energy < s.energyCapacity)
                    && s.freeSpots.length > 0;
            }});
            if (!closestDropOff) {
                console.log(this.creep.name + " no free spots");
                return false;
            }
            this.taskData.goal = closestDropOff.id;
            if (closestDropOff.addTransaction) {
                closestDropOff.addTransaction({amount:this.creep.carry.energy, from:this.creep.name});
            }

            let freeSpots = closestDropOff.freeSpots;

            for(let i = 0; i<freeSpots.length; i++) {
                let freeSpot = freeSpots[i];
                if (this.creep.reserve(freeSpot)) {
                    console.log(this.creep.name + " reserved " + JSON.stringify(freeSpot));
                    break;
                }
            }
        }
        
        if (this.taskData.goal && this.creep.reservation) {
            if (this.creep.distanceToTarget === -1) {
                console.log(this.name + " wrong distance, resetting");
                this.taskData.goal = null;
                this.taskData.type = null;
                this.creep.unreserve();
            } else if (this.creep.distanceToTarget > 0) {
                this.creep.moveToTarget();
            } else {
                let dropOff = Game.getObjectById(this.taskData.goal);
                let result = this.creep.transfer(dropOff, RESOURCE_ENERGY);
                if (result === ERR_NOT_IN_RANGE) {
                    console.log(this.creep.name + " should be close to " + dropOff.pos.x + "," + dropOff.pos.y + " dist " + this.creep.distanceToTarget);
                    this.creep.moveToTarget();
                } else {
                    console.log(this.creep.name + " dropoff result " + result + " at " + dropOff.pos.x + ", " + dropOff.pos.y);
                    this.creep.unreserve();
                    this.taskData.goal = null;
                }
            }
        } else {
            console.log(this.creep.name + " is aimless");
                this.taskData.goal = null;
                this.taskData.type = null;
                this.creep.unreserve();
        }
    }
}