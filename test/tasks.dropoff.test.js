describe("Dropping off", () => {
    const world = require("./world");
    const tasks = require("./../default/tasks");
    let source = null,
        creep = null,
        task = null;

    beforeEach(() => {
        world.initSimple();

        Game.spawns.Spawn1.pos = new RoomPosition(5, 5);
        Game.spawns.Spawn1._freeSpots = [{x:4, y:5}];
        Game.spawns.Spawn1.addTransaction = jest.fn();
        Game.getObjectById = () => Game.spawns.Spawn1;

        creep = new Creep("x", [MOVE,WORK,CARRY], {room:Game.rooms.W0N0});
        creep.pos = new RoomPosition(0, 0);
        creep.carry.energy = 50;
        creep.pos.findClosestByPath = jest.fn();
        creep.pos.findClosestByPath.mockReturnValue(Game.spawns.Spawn1);
        creep.moveTo = jest.fn();

        task = new tasks.dropoff(creep, {});
    })

    it("adds incoming transaction to closest dropoff point", () => {
        task.run();
        
        expect(Game.spawns.Spawn1.addTransaction).toHaveBeenCalledWith(expect.objectContaining({
            amount: 50,
            from: "x"
        }));
    });

    it("moves towards closest dropoff point", () => {
        [
            {x:0, y:0},
            {x:3, y:3},
            {x:3, y:5}
        ].forEach(pos => {
            Object.assign(creep.pos, pos);
            task.run();
            expect(creep.moveTo).toHaveBeenCalledWith(4, 5);
        });
    });

    it("transfers energy when arrived", () => {
        creep.transfer = jest.fn();
        
        creep.pos.x = 4;
        creep.pos.y = 5;
        task.run();

        expect(creep.transfer).toHaveBeenCalledWith(Game.spawns.Spawn1, RESOURCE_ENERGY);
    })
});