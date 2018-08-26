let _ = require("lodash");

class Creep {
    constructor(name, body) {
        this.name = name;
        this.body = body;
        this.carry = {};
        this.carryCapacity = _.filter(body, x => x === CARRY).length * 50;

        Game.creeps[name] = this;
        Memory.creeps[name] = this.memory = {};
    }

    moveTo() {}
}

global.Creep = Creep;