const World = require("./world");

beforeEach(() => {
    World.initSimple();
});

test("Executes strategy for level", () => {

    Game.rooms.W0N0.execute();

});