const world = require("./world");
const tasks = require("./../default/tasks");

describe("Task management", () => {
    
    let creep = null;

    beforeEach(() => {
        world.initSimple();
        creep = new Creep("x", [MOVE,CARRY,WORK],{room:Game.rooms.W0N0});
    });

    xtest("Selects task based on body", () => {
        creep.carry.energy = 50;

        creep.selectTask();

        expect(creep.task).toBeInstanceOf(tasks.upgrade);
    });

    xtest("Selects task based on energy capacity", () => {
        creep.carry.energy = 0;

        creep.selectTask();

        expect(creep.task).toBeInstanceOf(tasks.harvest);
    });

    test("Continues task while not done", () => {
        creep.carry.energy = 0;
        creep.selectTask();
        creep.carry.energy = 20;
        creep.selectTask();
        expect(creep.task).toBeInstanceOf(tasks.harvest);
    });

    test("Clears task when done", () => {
        creep.carry.energy = 0;
        creep.selectTask();
        creep.carry.energy = 50;
        creep.selectTask();
        expect(creep.task).toBeInstanceOf(tasks.upgrade);
    });
});