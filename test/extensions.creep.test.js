const world = require("./world");
require("./../default/extensions.creep.js");
require("./../default/extensions.room.js");

let creep = null;

beforeEach(() => {
    world.initSimple();
    creep = new Creep("x1");
});

test("Mock creeps attaches to game and memory", () => {
    expect(creep.name).toBe("x1");
    expect(Memory.creeps["x1"]).toBe(creep.memory);
    expect(Game.creeps["x1"]).toBe(creep);
});

test("Can reserve position", () => {
    creep.room = Game.rooms.W0N0;
    let pos = {x:0, y:0};
    creep.reserve(pos);
    expect(creep.room.memory.reservations["0,0"]).toEqual("x1");
});