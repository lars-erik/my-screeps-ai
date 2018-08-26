describe("Dropping off", () => {
    const world = require("./world");
    const tasks = require("./../default/tasks");
    let source = null;

    beforeEach(() => {
        world.initSimple();
    })

    it("adds incoming transaction to closest dropoff point", () => {
        let creep = new Creep("x", [MOVE,WORK,CARRY], {room:Game.rooms.W0N0});
        let task = new tasks.dropoff(creep, {});
        creep.pos = new RoomPosition();
        creep.pos.findClosestByPath = jest.fn();
        creep.carry.energy = 50;
        Game.spawns.Spawn1.addTransaction = jest.fn();

        creep.pos.findClosestByPath.mockReturnValue(Game.spawns.Spawn1);

        task.run();
        
        expect(Game.spawns.Spawn1.addTransaction).toHaveBeenCalledWith(expect.objectContaining({
            amount: 50,
            from: "x"
        }));
    });
});