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

test("Builds two heavy workers for each source plain", () => {
    let sources = [{},{},{}];
    World.extendFind(f => f === FIND_SOURCES ? sources : null);
    sources.forEach(s => s.plains = [{},{}]);
    
    for(let x = 0; x<9; x++) {

        Game.creeps = {};
        for(let y = 0; y<x; y++) {
            Game.creeps[y.toString()] = {};
        }
        
        strategy.execute(room);

        expect(spawn.spawnCreep).toHaveBeenCalledWith(
            [WORK, CARRY, MOVE, MOVE, 
            "Worker1"
        );
    
    }
})

test("Builds no more workers when enough", () => {
    let sources = [{},{},{}];
    World.extendFind(f => f === FIND_SOURCES ? sources : null);
    sources.forEach(s => s.plains = [{},{}]);

    Game.creeps = {};
    for(let y = 0; y<9; y++) {
        Game.creeps[y] = {};
    }
        
    strategy.execute(room);

    expect(spawn.spawnCreep).not.toHaveBeenCalledWith(
        [WORK, CARRY, MOVE, MOVE], 
        "Worker1"
    );
    
})