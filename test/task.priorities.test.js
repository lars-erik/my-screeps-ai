describe("Task priorities", () => {
    const world = require("./world");
    const tasks = require("./../default/tasks");

    beforeEach(() => {
        world.initSimple();
    });

    test("When enough energy, building has top priority", () => {
        Game.rooms.W0N0.energyAvailable = 300;
        Game.rooms.W0N0.energyCapacityAvailable = 300;
        world.extendFind(t => t === FIND_CONSTRUCTION_SITES ? [{}] : null);

        let creep = new Creep("x", [MOVE,WORK,CARRY], {room:Game.rooms.W0N0,carry:{energy:50}});

        creep.selectTask();
        expect(creep.task).toBeInstanceOf(tasks.build);

    });

    test("Dropping off energy has top priority", () => {
        Game.rooms.W0N0.energyAvailable = 299;
        Game.rooms.W0N0.energyCapacityAvailable = 300;
        world.extendFind(t => t === FIND_CONSTRUCTION_SITES ? [{}] : null);
        let creep = new Creep("x", [MOVE,WORK,CARRY], {room:Game.rooms.W0N0,carry:{energy:50}});

        creep.selectTask();
        expect(creep.task).toBeInstanceOf(tasks.dropoff);

    });
    
    test("Won't drop off if out of energy", () => {
        Game.rooms.W0N0.energyAvailable = 299;
        Game.rooms.W0N0.energyCapacityAvailable = 300;
        let creep = new Creep("x", [MOVE,WORK,CARRY], {room:Game.rooms.W0N0,carry:{energy:0}});
        creep.memory.taskData = {type:"harvest"};

        creep.selectTask();
        expect(creep.task).toBeInstanceOf(tasks.harvest);

    });
});