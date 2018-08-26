describe("Dropping off", () => {
    const world = require("./world");
    const tasks = require("./../default/tasks");
    let source = null,
        creep = null,
        task = null;

    beforeEach(() => {
        world.initSimple();
        Game.spawns.Spawn1.pos = new RoomPosition(5, 5);

        creep = new Creep("x", [MOVE,WORK,CARRY], {room:Game.rooms.W0N0});
        task = new tasks.dropoff(creep, {});
        creep.pos = new RoomPosition();
    })

    it("adds incoming transaction to closest dropoff point", () => {
        creep.carry.energy = 50;
        creep.pos.findClosestByPath = jest.fn();
        Game.spawns.Spawn1.addTransaction = jest.fn();

        creep.pos.findClosestByPath.mockReturnValue(Game.spawns.Spawn1);

        task.run();
        
        expect(Game.spawns.Spawn1.addTransaction).toHaveBeenCalledWith(expect.objectContaining({
            amount: 50,
            from: "x"
        }));
    });

    it("moves towards closest dropoff point", () => {
        creep.pos.findClosestByPath = jest.fn();
        creep.carry.energy = 50;
        Game.spawns.Spawn1.addTransaction = jest.fn();
        creep.pos.findClosestByPath.mockReturnValue(Game.spawns.Spawn1);
        creep.moveTo = jest.fn();

        task.run();
        
        expect(creep.moveTo).toHaveBeenCalledWith(5, 5);
    });
});