
RoomObject.prototype.dibs = function () {
    var self = this,
        dibs,
        totalDibbed,
        total; 
    
    function ensureDibsMemory() {
        if (!self.room.memory.dibs) {
            self.room.memory.dibs = {}
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
        return self.energy || self.store.energy;
    }

    dibs = ensureDibsMemory();
    totalDibbed = _getTotalDibbed();
    total = getTotal();

    return {
        place: function (creep) {
            var hasCapacity = total - totalDibbed >= creep.carryCapacity,
                notAlreadyDibbed = _.filter(dibs, function (d) { return d.id === creep.id; }).length === 0;
            if (hasCapacity && notAlreadyDibbed) {
                dibs.push({ id: creep.id, amount: creep.carryCapacity });
                return true;
            }
            return false;
        },
        remove: function(creep) {
            _.remove(dibs, function(d) { return d.id === creep.id; });
        }
    }
}