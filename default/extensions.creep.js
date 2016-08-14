Creep.prototype.isFull = function () {

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
        result = this.harvest(selectedSource), 
        self = this;
    result = this.moveByResult(result, selectedSource, moveToOnSuccess, function () { return self.isFull() });
    return result;
};

Creep.prototype.canPlaceDibs = function (roomObj) {
    if (!roomObj) {
        return false;
    }
    return roomObj.dibs().hasCapacity(this);
}

Creep.prototype.findClosestOfType = function(from, findType, filter) {
    return this.pos.findInRange(findType, 1, { filter: filter })[0] 
        || (from || this).pos.findClosestByPath(findType, { filter: filter });
}

function canPlaceDibs(creep, filter) {
    return function (source) {
        var filterResult = true;
        if (filter) {
            filterResult = filter(source);
        }
        return filterResult && creep.canPlaceDibs(source);
    }
}

Creep.prototype.giveDibs = function(source) {
    this.memory.dibs = source.id;
}

Creep.prototype.removeDibs = function () {
    this.memory.dibs = null;
}

Creep.prototype.getDibsSource = function() {
    if (this.memory.dibs) {
        return Game.getObjectById(this.memory.dibs);
    }
    return null;
}

Creep.prototype.pickupClosestEnergy = function(from, ignoreAffinity) {
    var self = this,
        result,
        closestEnergy = this.getDibsSource(),
        placeDibs = !closestEnergy;

    from = ignoreAffinity ? (from || this) : (this.affinity() || from || this);

    if (!closestEnergy) {
        closestEnergy = this.findClosestOfType(from, FIND_DROPPED_ENERGY, canPlaceDibs(self));
    }
    if (!closestEnergy) {
        closestEnergy = this.findClosestOfType(from, FIND_STRUCTURES, canPlaceDibs(self, function(structure) {
            return structure.structureType === STRUCTURE_CONTAINER;
        }));
    }
    if (closestEnergy) {
        if (placeDibs) {
            closestEnergy.dibs().place(this);
        }
        result = closestEnergy.yield(this);
        if (result === OK) {
            closestEnergy.dibs().remove(this);
        }
        this.moveByResult(result, closestEnergy, from);
        return true;
    }
    return false;
}

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
            filter: function(structure) {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });
    }
    if (!target) {
        target = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) {
                return (structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
    }
    return target;
}