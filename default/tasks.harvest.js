module.exports = class HarvestTask {
    constructor(creep, taskData) {
        this.creep = creep;
        this.taskData = taskData;
    }

    done() {
        return this.creep.carry.energy === this.creep.carryCapacity;
    }

    run() {
        let sources = _.filter(this.creep.room.sources, s => s.freeSpots.length > 0);
        this.creep.reserve(sources[0].freeSpots[0]);
    }
}