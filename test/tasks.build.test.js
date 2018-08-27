describe("Build task", () => {

    const world = require("./world"),
          BuildTask = require("./../default/tasks.build.js");
    

    let site = null,
        creep = null,
        task = null;

    beforeEach(() => {
        world.initSimple();

        site = {pos:{x:2,y:2}};
        world.extendFind(t => t === FIND_CONSTRUCTION_SITES ? site : null);

        creep = new Creep("builder", [MOVE,WORK,CARRY]);
        creep.build = jest.fn();

        task = new BuildTask(creep, {});
    })

    test("It tries to build", () => {
        task.run();

        expect(creep.build).toHaveBeenCalled();
    })

    test("It moves towards closest build site when out of range", () => {
        creep.build.mockReturnValue(ERR_NOT_IN_RANGE);
        creep.moveTo = jest.fn();
        
        task.run();

        expect(creep.moveTo)
    })

    test("It is done when out of energy", () => {
        creep.carry.energy = 0;
        
        expect(task.done()).toBeTruthy();
    })

});