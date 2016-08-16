module.exports = {
    run: function (creep) {
        var pos;
        if (creep.memory.target) {
            pos = new RoomPosition(creep.memory.target.x, creep.memory.target.y, creep.memory.target.roomName);
            creep.moveTo(pos);
        } else {
            creep.say("where?");
        }
    }
};