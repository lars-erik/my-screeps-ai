let World = require("./world");
let strategy = null;
let spawn = null;
let controller = null;
let room = null;

beforeEach(() => {
    World.initSimple();
    strategy = Strategies.room.level1;
    spawn = Game.spawns.Spawn1;
    room = Game.rooms.W0N0;
});

test("If no creeps, creates a harvester", () => {
    strategy.execute(room);

    expect(spawn.spawnCreep).toHaveBeenCalledWith(
        [WORK, CARRY, MOVE], 
        "Harvester1", 
        {memory:{role:"harvester"}}
    );
})

test("If one harvester, creates a harvester", () => {
    Game.creeps.Harvester1 = {memory:{role:"harvester"}};
    Game.time++;

    strategy.execute(room);

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

    strategy.execute(room);

    expect(spawn.spawnCreep).toHaveBeenCalledWith(
        [WORK, CARRY, MOVE], 
        "Upgrader3", 
        {memory:{role:"upgrader"}}
    );
})
