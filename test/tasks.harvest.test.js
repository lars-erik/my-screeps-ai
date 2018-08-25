const world = require("./world");
require("./../default/extensions.creep.js");
require("./../default/extensions.room.js");

beforeEach(() => {
    world.initSimple();
});

test("Finds closest energy source with free spots", () => {
    world.extendFind((type, opts) => {
        if (type === FIND_SOURCES) {
            return [{},{}];
        }
    });

    console.pretty(Game.rooms.W0N0.sources);

    expect(true).toBe(false);
});