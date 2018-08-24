let World = require("./world");
let Initial = require("./../default/strategies.initial");
let strategy = null;

beforeEach(() => {
    World.init();
    strategy = new Initial();
});

test("If no creeps, creates a harvester", () => {
    Game.spawns.Spawn1 = {
        name: "Spawn1",
        calls: [],
        spawnCreep(body, name, opts) {
            Game.spawns.Spawn1.calls.push([body, name, opts]);
        }
    };

    Game.rooms.W0N0 = {
        energyAvailable: 150,
        find(type, opts) {
            if (type === FIND_STRUCTURES && opts.filter.structureType === STRUCTURE_SPAWN) {
                return [Game.spawns.Spawn1];
            }
            if (type === FIND_CREEPS) {
                return [];
            }
        }
    }

    strategy.execute();

    expect(Game.spawns.Spawn1.calls[0][0]).toEqual([WORK, CARRY, MOVE]);
    expect(Game.spawns.Spawn1.calls[0][1]).toMatch("Harvester");
    expect(Game.spawns.Spawn1.calls[0][2]).toEqual({memory:{role:"harvester"}});
})