global.RoomPosition = class RoomPosition {
    constructor(x, y, roomName) {
        if (x.x) {
            this.x = x.x;
            this.y = x.y;
            this.roomName = y;
        } else {
            this.x = x;
            this.y = y;
            this.roomName = roomName;
        }
    }

    getRangeTo(x, y) {
        let pos;
        if (x.pos) {
            pos = x.pos;
        } else if (x.x) {
            pos = x;
        } else {
            pos = {x:x, y:y};
        }
        let dist = Math.sqrt(
            Math.pow(Math.abs(this.x - pos.x), 2) +
            Math.pow(Math.abs(this.y - pos.y), 2)
        );
        return Math.floor(dist);
    }
}