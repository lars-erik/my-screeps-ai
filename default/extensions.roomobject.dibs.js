
RoomObject.prototype.dibs = function () {
    var self = this,
        dibs,
        totalDibbed,
        total; 
    
    function ensureDibsMemory() {
        var i;
        if (!self.room.memory.dibs) {
            self.room.memory.dibs = {}
        } else {
            for (i = self.room.memory.dibs.length; i>=0; i--) {
                if (!Game.getObjectById(self.room.memory.dibs[i])) {
                    self.room.memory.dibs.splice(i, 1);
                }
            }
        }
        if (!self.room.memory.dibs[self.id]) {
            self.room.memory.dibs[self.id] = [];
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
        return total - totalDibbed >= creep.carryCapacity;
    }
    
    function notAlreadyDibbedBy(creep) {
        return _.filter(dibs, function (d) { return d.id === creep.id; }).length === 0;
    }

    dibs = ensureDibsMemory();
    totalDibbed = getTotalDibbed();
    total = getTotal();

    return {
        hasCapacity: hasCapacity,
        place: function (creep) {
            if (hasCapacity(creep) && notAlreadyDibbedBy(creep)) {
                dibs.push({ id: creep.id, amount: creep.carryCapacity });
                creep.giveDibs(self);
                return true;
            }
            return false;
        },
        remove: function(creep) {
            _.remove(dibs, function (d) { return d.id === creep.id; });
            creep.removeDibs();
        }
    }
}