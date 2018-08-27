describe("Harvest task", () => {
    const world = require("./world");
    const tasks = require("./../default/tasks");

    let creep = null;
    let source = null;

    beforeEach(() => {
        world.initSimple();

        source = new Source("1", {pos:{x:5, y:5}, room:Game.rooms.W0N0});
        source.pos.findInRange = jest.fn();
        source.pos.findInRange.mockReturnValue([]);
        world.extendFind((type, opts) => {
            if (type === FIND_SOURCES) {
                return [source];
            }
        });

        creep = new Creep("x", [MOVE,CARRY,WORK]);
        creep.pos = new RoomPosition(0, 0);
        creep.room = Game.rooms.W0N0;
        creep.pos.findClosestByPath = jest.fn();
        creep.pos.findClosestByPath.mockReturnValue(source);
        creep.moveTo = jest.fn();
        creep.harvest = jest.fn();

        Game.rooms.W0N0.lookAtArea = jest.fn();
        Game.rooms.W0N0.lookAtArea.mockReturnValue({"5":{"4":[{"terrain":"plain"}]}});

        Game.getObjectById = jest.fn();
        Game.getObjectById.mockReturnValue(source);

   });

    test("Reserves spot by closest energy source with free spots", () => {
        let task = new tasks.harvest(creep, {});
        task.run();

        expect(creep.reservation).toMatchObject({x:4,y:5});
    });

    test("Moves towards energy source when not in range", () => {
        let positions = [
            new RoomPosition(0, 0),
            new RoomPosition(4, 4)
        ];
        positions.forEach(pos => {
            let task = new tasks.harvest(creep, {});
            Object.assign(creep.pos, pos);
            creep.moveTo = jest.fn();
        
            task.run();

            expect(creep.moveTo).toHaveBeenCalledWith(4, 5);
        });
    });

    test("Harvests when in range", () => {
        let task = new tasks.harvest(creep, {goal:"1"});
        
        creep.pos = new RoomPosition(4, 5);
        creep.reserve(creep.pos);
    
        task.run();

        expect(creep.harvest).toHaveBeenCalledWith(source);
    });

    test("Does not pick area with enemy nearby", () => {
        let taskData = {};
        let task = new tasks.harvest(creep, taskData);
        source.pos.findInRange.mockReturnValue([{}]);
        expect(creep.moveTo).not.toHaveBeenCalled();

        task.run();

        expect(creep.moveTo).not.toHaveBeenCalled();
        expect(creep.harvest).not.toHaveBeenCalled();
        expect(taskData.goal).not.toBeDefined();
    });
});