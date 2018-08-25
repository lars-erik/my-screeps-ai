
RoomObject.prototype.dibs = function (key) {
    var self = this,
        dibs = ensureDibsMemory(),
        totalDibbed = getTotalDibbed(),
        total = getTotal();

    function ensureDibsMemory() {
        var i,
            theseDibs;
        
        if (!self.room.memory.dibs) {
            self.room.memory.dibs = {}
        }
        if (!self.room.memory.dibs[self.id]) {
            self.room.memory.dibs[self.id] = [];
        } else {
            theseDibs = self.room.memory.dibs[self.id];
            for (i = theseDibs.length; i >= 0; i--) {
                if (!theseDibs[i] || !theseDibs[i].id || !Game.creeps[theseDibs[i].id]) {
                    theseDibs.splice(i, 1);
                }
            }
        }
        return self.room.memory.dibs[self.id];
    }
    
    function getTotalDibbed() {
        return _.sum(dibs, function(d) { return d.amount; });
    }
    
    function getTotal() {
        if (self.energy !== undefined) {
            return self.energy;
        } else if (self.store) {
            return self.store.energy;
        }
        return 0;
    }

    function hasCapacity(creep) {
        if (self.structureType === STRUCTURE_SPAWN || self.structureType === STRUCTURE_EXTENSION || self.structureType === STRUCTURE_TOWER) {
            return total + totalDibbed < self.energyCapacity;
        } else {
            return total - totalDibbed >= creep.carryCapacity;
        }
    }
    
    function notAlreadyDibbedBy(creep) {
        return _.filter(dibs, function (d) { return d.id === creep.name; }).length === 0;
    }

    return {
        hasCapacity: hasCapacity,
        place: function (creep, ignoreCapacity) {
            if ((ignoreCapacity || hasCapacity(creep)) && notAlreadyDibbedBy(creep)) {
                dibs.push({ id: creep.name, amount: creep.carryCapacity });
                creep.giveDibs(self, key);
                return true;
            }
            return false;
        },
        remove: function(creep) {
            _.remove(dibs, function (d) { return d.id === creep.name; });
            creep.removeDibs(key);
        }
    }
}
