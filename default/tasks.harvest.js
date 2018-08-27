module.exports = class HarvestTask {
    constructor(creep, taskData) {
        this.creep = creep;
        this.taskData = taskData;
    }

    done() {
        return this.creep.carry.energy === this.creep.carryCapacity;
    }

    run() {
        if (!this.taskData.goal || !this.creep.reservation) {
            let sources = _.filter(this.creep.room.sources, s => s.freeSpots.length > 0);
            this.creep.reserve(sources[0].freeSpots[0]);
            this.taskData.goal = sources[0].id;
        }

        if (this.creep.distanceToTarget === 0) {
            let goal = Game.getObjectById(this.taskData.goal);
            let response = this.creep.harvest(goal);
        } else {
            let response = this.creep.moveToTarget();
        }
    }
}