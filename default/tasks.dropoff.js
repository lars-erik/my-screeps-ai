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
                return s.energyCapacity && (s.energy < s.energyCapacity);
            });
            if (!closestDropOff) {
                return false;
            }
            this.taskData.goal = closestDropOff.id;
            closestDropOff.addTransaction({amount:this.creep.carry.energy, from:this.creep.name});
        }
    }
}