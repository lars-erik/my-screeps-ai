describe("Task priorities", () => {
    const world = require("./world");
    const tasks = require("./../default/tasks");

    beforeEach(() => {
        world.initSimple();
    });

    test("Dropping off energy has top priority", () => {
        Game.rooms.W0N0.energyAvailable = 299;
        Game.rooms.W0N0.energyCapacityAvailable = 300;
        let creep = new Creep("x", [MOVE,WORK,CARRY], {room:Game.rooms.W0N0,carry:{energy:50}});

        creep.selectTask();
        expect(creep.task).toBeInstanceOf(tasks.dropoff);

    });
});