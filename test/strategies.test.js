let World = require("./world");

beforeEach(() => {
    World.initSimple();
});

test("Creates strategy implementation for a room", () => {
    let strategy = Strategies.create("level1");
    expect(strategy).toBeInstanceOf(Strategies.levels.level1);
});

test("Defaults to level1 if strategy is invalid", () => {
    let strategy = Strategies.create("asdf");
    expect(strategy).toBeInstanceOf(Strategies.levels.level1);
});
