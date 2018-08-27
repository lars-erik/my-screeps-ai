module.exports = class BuildTask {
    constructor(creep, taskData) {
        this.creep = creep;
        this.taskData = taskData;
        this.sites = this.creep.room.constructionSites;
    }

    done() {
        return this.sites.length === 0 || this.creep.carry.energy === 0;
    }

    run() {
        let site = this.sites[0];
        if (this.creep.build(site) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(site);
        }
    }
}