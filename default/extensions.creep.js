Creep.prototype.isFull = function() {
    return _.sum(this.carry) === this.carryCapacity;
};

Creep.prototype.isEmpty = function() {
    return _.sum(this.carry) === 0;
};

Creep.prototype.affinityId = function() {
    return this.memory.affinity || this.room.memory.affinities[this.memory.role];
};

Creep.prototype.affinity = function() {
    return Game.getObjectById(this.affinityId());
};

Creep.prototype.harvestClosestSource = function(source, moveToOnSuccess) {
    var selectedSource = this.affinity() || source || this.closestSource(),
        result = this.harvest(selectedSource);
    result = this.moveByResult(result, selectedSource, moveToOnSuccess, (creep) => creep.isFull());
    return result;
};

Creep.prototype.moveByResult = function(result, rangeTarget, successTarget, predicate) {
    var predicateResult = predicate ? predicate(this) : true;
    if (result === OK && successTarget && predicateResult) {
        this.moveTo(successTarget);
    } else if (result === ERR_NOT_IN_RANGE && rangeTarget) {
        this.moveTo(rangeTarget);
    }
};

Creep.prototype.closestDropOff = function() {
    var target = null;
    if (!target) {
        target = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });
    }
    if (!target) {
        target = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
    }
    return target;
}