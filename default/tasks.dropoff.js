module.exports = class DropOff {
    constructor(creep, taskData) {
        this.creep = creep;
        this.taskData = taskData;
    }
    
    done() {
    }

    run() {
        if (!this.taskData.goal) {
            let closestDropOff = this.creep.pos.findClosestByPath(FIND_MY_STRUCTURES, s => {
                return s.energyCapacity && (s.energy < s.energyCapacity)
                    && s.freeSpots.length > 0;
            });
            if (!closestDropOff) {
                return false;
            }
            this.taskData.goal = closestDropOff.id;
            closestDropOff.addTransaction({amount:this.creep.carry.energy, from:this.creep.name});
            let freeSpot = closestDropOff.freeSpots[0];
            this.creep.reserve(freeSpot);
        }
        
        if (this.taskData.goal) {
            if (this.creep.distanceToTarget > 1) {
                this.creep.moveToTarget();
            } else {
                let dropOff = Game.getObjectById(this.taskData.goal);
                this.creep.transfer(dropOff, RESOURCE_ENERGY);
            }
        }
    }
}