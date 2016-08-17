Creep.prototype.isFull = function () {
    
    return _.sum(this.carry) === this.carryCapacity;
};

Creep.prototype.isEmpty = function () {
    return _.sum(this.carry) === 0;
};

Creep.prototype.affinityId = function (key) {
    return this.memory[key || "affinity"] || this.room.memory.affinities[this.memory.role];
};

Creep.prototype.affinity = function (key) {
    return Game.getObjectById(this.affinityId(key));
};

Creep.prototype.harvestClosestSource = function (source, moveToOnSuccess) {
    var selectedSource = this.affinity() || source || this.closestSource(),
        result = this.harvest(selectedSource), 
        self = this;
    result = this.moveByResult(result, selectedSource, moveToOnSuccess, function () { return self.isFull() });
    return result;
};

Creep.prototype.canPlaceDibs = function (roomObj, key) {
    if (!roomObj) {
        return false;
    }
    return roomObj.dibs(key).hasCapacity(this);
}

Creep.prototype.findClosestOfType = function (from, findType, filter) {
    return this.pos.findInRange(findType, 1, { filter: filter })[0] || 
           (from || this).pos.findClosestByPath(findType, { filter: filter });
}

function canPlaceDibs(creep, filter) {
    return function (source) {
        var filterResult = true,
            result = false;
        if (filter) {
            filterResult = filter(source);
        }
        if (filterResult) {
            result = creep.canPlaceDibs(source);
        }
        return result;
    };
}

Creep.prototype.giveDibs = function (source, key) {
    this.memory[key || "dibs"] = source.id;
}

Creep.prototype.removeDibs = function (key) {
    this.memory[key || "dibs"] = null;
}

Creep.prototype.getDibsObj = function (key) {
    if (this.memory[key || "dibs"]) {
        return Game.getObjectById(this.memory[key || "dibs"]);
    }
    return null;
}

Creep.prototype.pickupClosestEnergy = function (from, ignoreAffinity) {
    var self = this,
        result,
        closestEnergy = this.getDibsObj(),
        placeDibs = !closestEnergy;
    
    from = ignoreAffinity ? (from || this) : (this.affinity() || from || this);
    
    if (!closestEnergy) {
        closestEnergy = this.findClosestOfType(from, FIND_DROPPED_ENERGY, canPlaceDibs(self));
    }
    if (!closestEnergy) {
        closestEnergy = this.findClosestOfType(from, FIND_STRUCTURES, canPlaceDibs(self, function (structure) {
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

Creep.prototype.moveByResult = function (result, rangeTarget, successTarget, predicate) {
    var predicateResult = predicate ? predicate(this) : true;
    if (result === OK && successTarget && predicateResult) {
        this.moveTo(successTarget);
    } else if (result === ERR_NOT_IN_RANGE && rangeTarget) {
        this.moveTo(rangeTarget);
    }
};

Creep.prototype.closestDropOff = function () {
    var target = this.getDibsObj("dropOff"),
        self = this;
    if (!target) {
        target = this.findClosestOfType(self, FIND_STRUCTURES, function (structure) {
            var isValidStructure = (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity &&
                    self.canPlaceDibs(structure, "dropOff");
            return isValidStructure;
        }
        );
    }
    if (!target) {
        target = this.findClosestOfType(self, FIND_STRUCTURES, function (structure) {
            return (structure.structureType === STRUCTURE_TOWER) &&
                structure.energy < structure.energyCapacity &&
                self.canPlaceDibs(structure, "dropOff");
        }
        );
    }
    return target;
}