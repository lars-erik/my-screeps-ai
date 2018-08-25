class Room {
    get memory() {
        if (!Memory.rooms[this.name]) {
            Memory.rooms[this.name] = {};
        }
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

    constructor(name) {
        this.controller = {};
        this.energyAvailable = 0;
        this.energyCapacityAvailable = 0;
        this.name = name;
        this.storage = {};
        this.terminal = {};
        this.visual = {};
        Game.rooms[name] = this;
    }
}

global.Room = Room;