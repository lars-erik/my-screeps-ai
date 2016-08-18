module.exports = {
    run: function (creep) {
        var target = creep.memory.target;
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