let World = require("./world");

beforeEach(() => {
    World.initSimple();
});

test("Creates strategy implementation for a room", () => {
    let strategy = Strategies.create("room", "level1");
    expect(strategy).toBe(Strategies.room.level1);
});

test("Defaults to level1 if strategy is invalid", () => {
    let strategy = Strategies.create("room", "asdf");
    expect(strategy).toBe(Strategies.room.level1);
});
