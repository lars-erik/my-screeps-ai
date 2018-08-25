const world = require("./world");
let room = null;
let strategy;

beforeEach(() => {
    world.initSimple();
    strategy = Strategies.room.level2;

    room = Game.rooms.W0N0;

    world.extendFind((x, o) => {
        if (o.filter.structureType === STRUCTURE_EXTENSION) {
            return [];
        }
    });
})

test("Executes level 1", () => {
    Strategies.room.level1.execute = jest.fn();

    strategy.execute(room);

    expect(Strategies.room.level1.execute).toHaveBeenCalled();
});

test("Attempts to build extension on all 8 straight points at 2 away", () => {

    room.createConstructionSite = jest.fn();

    strategy.execute(room);

    expect(room.createConstructionSite).toHaveBeenCalledTimes(9);

});