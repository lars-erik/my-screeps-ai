const world = require("./world");
let room = null;

beforeEach(() => {
    world.initSimple();

    room = Game.rooms.W0N0;

    world.extendFind((x, o) => {
        if (o.filter.structureType === STRUCTURE_EXTENSION) {
            return [];
        }
    });
})

test("Executes level 1", () => {
    let strategy = Strategies.room.level2;
    Strategies.room.level1.execute = jest.fn();

    strategy.execute(room);

    expect(Strategies.room.level1.execute).toHaveBeenCalled();
});

test("Builds extension at first available angle and shortest magnitude", () => {

    expect(true).toBe(false);

});