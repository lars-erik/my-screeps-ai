class Room {
    get memory() {
        return Memory.rooms[this.name];
    };

    serializePath() {}
    deserializePath() {}
    createConstructionSite() {}
    createFlag() {}
    find() {}
    findExitTo() {}
    findPath() {}
    getPositionAt() {}
    lookAt() {}
    lookAtArea() {}
    loogForAt() {}
    lookForAtArea() {}

    constructor() {
        this.controller = {};
        this.energyAvailable = 0;
        this.energyCapacityAvailable = 0;
        this.name = "";
        this.storage = {};
        this.terminal = {};
        this.visual = {};
    }
}

global.Room = Room;