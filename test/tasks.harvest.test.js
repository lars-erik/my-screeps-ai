const world = require("./world");
let tasks = require("./../default/tasks");

beforeEach(() => {
    world.initSimple();
    world.extendFind((type, opts) => {
        if (type === FIND_SOURCES) {
            return [new Source("1", {pos:{x:5, y:5}, room:Game.rooms.W0N0})];
        }
    });
});

test("Reserves spot by closest energy source with free spots", () => {
    let creep = new Creep("x", [MOVE,CARRY,WORK]);
    creep.room = Game.rooms.W0N0;
    Game.rooms.W0N0.lookAtArea = jest.fn();
    Game.rooms.W0N0.lookAtArea.mockReturnValue({"5":{"4":[{"terrain":"plain"}]}});

    let task = new tasks.harvest(creep, {});
    task.run();

    expect(creep.reservation).toMatchObject({x:4,y:5});
});