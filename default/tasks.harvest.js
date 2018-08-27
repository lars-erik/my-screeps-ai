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
            let sources = _.filter(this.creep.room.sources, s => 
                (s.freeSpots.length > 0 || this.creep.pos.getRangeTo(s) === 1)
                && s.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length === 0);
            let source = this.creep.pos.findClosestByPath(sources);
            if (!source) {
                return;
            }
            if (source.freeSpots.length) {
                this.creep.reserve(source.freeSpots[0]);
            }
            this.taskData.goal = source.id;
        }

        if (this.creep.distanceToTarget <= 0) {
            let goal = Game.getObjectById(this.taskData.goal);
            let response = this.creep.harvest(goal);
            if (response !== OK) {
                console.log(this.creep.name + " couldn't harvest cause " + response);
            }
        } else {
            let response = this.creep.moveToTarget();
        }
    }
}