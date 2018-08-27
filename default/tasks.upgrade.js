module.exports = class UpgradeTask {
    constructor(creep, taskData) {
        this.creep = creep;
        this.taskData = taskData;
    }

    done() {
        return this.creep.carry.energy === 0;
    }

    run() {
        if (this.creep.upgradeController(this.creep.room.controller) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.creep.room.controller);
        }
    }
}
