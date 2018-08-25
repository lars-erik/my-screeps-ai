module.exports = {
    run: function (creep) {
        var memory = Memory.groups[creep.memory.group] || creep.memory,
            target = memory.target;
        if (!target) {
            target = creep.memory.target = {
                room: "",
                x: 0,
                y: 0
            }
        }
        if (target.room) {
            creep.moveTo(new RoomPosition(target.x, target.y, target.room));
        }
    }
}