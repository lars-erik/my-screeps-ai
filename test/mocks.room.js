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

    constructor(name) {
        this.controller = {};
        this.energyAvailable = 0;
        this.energyCapacityAvailable = 0;
        this.name = name;
        this.storage = {};
        this.terminal = {};
        this.visual = {text: function() {}};
        Memory.rooms[this.name] = {};
        Game.rooms[name] = this;
    }
}

global.Room = Room;