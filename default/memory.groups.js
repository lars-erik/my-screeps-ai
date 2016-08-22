module.exports = {
    init: function() {
        if (!Memory.groups) {
            Memory.groups = {};
        }
    },
    utils: {
        create: function(name, memory) {
            if (Memory.groups[name]) {
                console.log("Group exists");
                return false;
            }

            Memory.groups[name] = _.extend({}, memory);
            return true;
        },
        setMemory: function(name, memory) {
            if (!Memory.groups[name]) {
                console.log("Group not found");
                return false;
            }
            
            Memory.groups[name] = _.extend(Memory.groups[name], memory);
            return true;
        }
    } 
}