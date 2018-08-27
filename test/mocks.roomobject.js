global.RoomObject = class RoomObject {
    constructor(pos, room) {
        this.pos = pos || new RoomPosition(0, 0);
        this.room = room || Game.rooms.W0N0;
    }
}