class Creep {
    constructor(name) {
        this.name = name;
        Game.creeps[name] = this;
        Memory.creeps[name] = this.memory = {};
    }
}

global.Creep = Creep;