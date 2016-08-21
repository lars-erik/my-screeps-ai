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
        }
    } 
}