const world = require("./world");

beforeEach(() => {
    world.initSimple();
})

test("Executes level 1", () => {
    let strategy = Strategies.room.level2;
    Strategies.room.level1.execute = jest.fn();

    strategy.execute();

    expect(Strategies.room.level1.execute).toHaveBeenCalled();
});

test("Builds extension at first available angle and shortest magnitude", () => {

    expect(true).toBe(false);

});