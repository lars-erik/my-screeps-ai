module.exports = {
    run: function (creep) {
        var pos,
            group = Memory.groups[creep.memory.group],
            memory = group || creep.memory;
        if (memory.target) {
            pos = new RoomPosition(memory.target.x, memory.target.y, memory.target.room);
            creep.moveTo(pos);
        } else {
            creep.say("where?");
        }
    }
};