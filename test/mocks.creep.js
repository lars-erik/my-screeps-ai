let _ = require("lodash");

class Creep extends RoomObject {
    constructor(name, body, props) {
        super()
        this.name = name;
        this.body = body;
        this.carry = {};
        this.carryCapacity = _.filter(body, x => x === CARRY).length * 50;

        Game.creeps[name] = this;
        Memory.creeps[name] = this.memory = {};

        Object.assign(this, props || {});
    }

    moveTo() {}
}

global.Creep = Creep;