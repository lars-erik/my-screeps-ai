const World = require("./world");
const role = require("./../default/roles.harvester");

let creep = null;
let source = null;

beforeEach(() => {
    source = {};
    World.initSimple();
    World.extendFind((type, filter) => {
        if (type === FIND_SOURCES) {
            return [source];
        }
        return null;
    });
    creep = World.createCreep("Harvester1", "harvester");
    creep.pos.findClosestByPath = jest.fn();
    creep.pos.findClosestByPath.mockReturnValue(source);
});

xtest("When empty, finds closest source", () => {
    role.execute(creep);
    expect(creep.harvest).toHaveBeenCalledWith(source);
});

xtest("When too far from source, moves closer", () => {
    creep.harvest.mockReturnValue(ERR_NOT_IN_RANGE);
    role.execute(creep);
    expect(creep.moveTo).toHaveBeenCalledWith(source, expect.objectContaining({}));
});

xtest("When full, tries to drop off at spawn", () => {
    creep.carry.energy = creep.carryCapacity;
    role.execute(creep);
    expect(creep.transfer).toHaveBeenCalledWith(Game.spawns.Spawn1, RESOURCE_ENERGY);
});

xtest("When full and far away from spawn, moves towards spawn", () => {
    creep.transfer.mockReturnValue(ERR_NOT_IN_RANGE);
    creep.carry.energy = creep.carryCapacity;
    role.execute(creep);
    expect(creep.moveTo).toHaveBeenCalledWith(Game.spawns.Spawn1, expect.objectContaining({}));
});