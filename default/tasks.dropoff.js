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
                return false;
            }
            this.taskData.goal = closestDropOff.id;
            if (closestDropOff.addTransaction) {
                closestDropOff.addTransaction({amount:this.creep.carry.energy, from:this.creep.name});
            }

            let freeSpots = closestDropOff.freeSpots;
            let freeSpot = freeSpots[0];
            this.creep.reserve(freeSpot);
        }
        
        if (this.taskData.goal) {
            if (this.creep.distanceToTarget > 0) {
                this.creep.moveToTarget();
            } else {
                let dropOff = Game.getObjectById(this.taskData.goal);
                this.creep.transfer(dropOff, RESOURCE_ENERGY);
                this.creep.unreserve();
                this.taskData.goal = null;
            }
        }
    }
}