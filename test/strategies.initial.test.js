let World = require("./world");
let Initial = require("./../default/strategies.initial");
let strategy = null;
let spawn = null;

beforeEach(() => {
    World.initSimple();
    strategy = new Initial();
    spawn = Game.spawns.Spawn1;

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