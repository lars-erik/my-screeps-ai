const World = require("./world");

beforeEach(() => {
    World.initSimple();
});

test("Executes strategy for controller level 1", () => {
    Strategies.room.level1.execute = jest.fn();

    Game.rooms.W0N0.execute();

    expect(Strategies.room.level1.execute).toHaveBeenCalledWith(Game.rooms.W0N0);
});

test("Executes strategy for controller level 2", () => {
    Strategies.room.level2 = {execute: jest.fn()};

    Game.rooms.W0N0.controller.level = 2;
    Game.rooms.W0N0.execute();

    expect(Strategies.room.level2.execute).toHaveBeenCalledWith(Game.rooms.W0N0);
});