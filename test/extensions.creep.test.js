const world = require("./world");
require("./../default/extensions.creep.js");
require("./../default/extensions.room.js");

let creep = null;

beforeEach(() => {
    world.initSimple();
    creep = new Creep("x1", [MOVE, CARRY, WORK]);
    creep.room = Game.rooms.W0N0;
});

test("Mock creeps attaches to game and memory", () => {
    expect(creep.name).toBe("x1");
    expect(Memory.creeps["x1"]).toBe(creep.memory);
    expect(Game.creeps["x1"]).toBe(creep);
});

test("Can reserve position", () => {
    let pos = {x:0, y:0};
    creep.reserve(pos);
    expect(creep.room.memory.reservations["0,0"]).toEqual("x1");
    expect(creep.reservation).toEqual({x:0, y:0});
});

test("Can unreserve positions", () => {
    let pos = {x:0, y:0};
    creep.reserve(pos);
    creep.unreserve();
    expect(creep.room.memory.reservations["0,0"]).toBeUndefined();
    expect(creep.reservation).toBeUndefined();
});

test("Moves toward reservation", () => {
    creep.moveTo = jest.fn();

    creep.pos = {x: 0, x: 0};
    creep.reserve({x:2, y: 2});
    creep.moveToTarget();
    expect(creep.moveTo).toHaveBeenCalledWith(2, 2);
});

test("Keeps reservation when reached target with moveToTarget()", () => {
    creep.moveTo = jest.fn();
    creep.pos = {x: 2, y: 2};
    creep.reserve({x:2, y: 2});

    creep.unreserve = jest.fn();

    creep.moveToTarget();

    expect(creep.unreserve).not.toHaveBeenCalled();
});

test("Unreserves when reserving new position", () => {
    creep.unreserve = jest.fn();

    creep.reserve({x:2, y: 2});

    expect(creep.unreserve).toHaveBeenCalled();
});

test("When one tick to live, clears reservation including own memory when commits suicide", () => {
    creep.ticksToLive = 1;
    creep.unreserve = jest.fn();
    creep.suicide = jest.fn();
    creep.reserve(1, 1);
    console.log(creep.name);

    creep.run();

    expect(creep.memory).toBeUndefined();
    expect(Game.rooms.W0N0.reservations["1,1"]).toBeUndefined();
    expect(Memory.creeps[creep.name]).toBeUndefined();
    expect(creep.suicide).toHaveBeenCalled();
});