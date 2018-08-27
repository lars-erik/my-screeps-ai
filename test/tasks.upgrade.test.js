describe("Upgrade task", () => {
    const world = require("./world");
    const UpgradeTask = require("./../default/tasks.upgrade");

    let task = null,
        creep = null;

    beforeEach(() => {
        world.initSimple();

        creep = new Creep("x", [MOVE,CARRY,WORK]);
        task = new UpgradeTask(creep, {});

        creep.upgradeController = jest.fn();
    });

    test("tries to upgrade every time", () => {
        task.run();

        expect(creep.upgradeController).toHaveBeenCalledWith(Game.rooms.W0N0.controller);
    });

    test("moves towards controller when out of range", () => {
        creep.upgradeController.mockReturnValue(ERR_NOT_IN_RANGE);
        creep.moveTo = jest.fn();

        task.run();

        expect(creep.moveTo).toHaveBeenCalledWith(Game.rooms.W0N0.controller);
    });
});