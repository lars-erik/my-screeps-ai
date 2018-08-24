let World = require("./world");
let strategy = null;
let spawn = null;
let controller = null;

beforeEach(() => {
    World.initSimple();
    strategy = new Strategies.levels.level1();
    spawn = Game.spawns.Spawn1;
    controller = {level: 1};
    Memory.gameState = { strategy: "level1" };

    World.extendFind((type, opts) => {
        if (opts.filter.structureType === STRUCTURE_CONTROLLER) {
            return controller;
        }
    });
});

test("If no creeps, creates a harvester", () => {
    strategy.execute();

    expect(spawn.spawnCreep).toHaveBeenCalledWith(
        [WORK, CARRY, MOVE], 
        "Harvester1", 
        {memory:{role:"harvester"}}
    );
})

test("If one harvester, creates a harvester", () => {
    Game.creeps.Harvester1 = {memory:{role:"harvester"}};
    Game.time++;

    strategy.execute();

    expect(spawn.spawnCreep).toHaveBeenCalledWith(
        [WORK, CARRY, MOVE], 
        "Harvester2", 
        {memory:{role:"harvester"}}
    );
})

test("If two harvesters, creates an upgrader", () => {
    Game.creeps.Harvester1 = {memory:{role:"harvester"}};
    Game.creeps.Harvester2 = {memory:{role:"harvester"}};
    
    Game.time+=2;

    strategy.execute();

    expect(spawn.spawnCreep).toHaveBeenCalledWith(
        [WORK, CARRY, MOVE], 
        "Upgrader3", 
        {memory:{role:"upgrader"}}
    );
})
