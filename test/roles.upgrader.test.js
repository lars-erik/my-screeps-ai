const World = require("./world")
const role = require("./../default/roles.upgrader");

let creep = null;

beforeEach(() => {
    World.initSimple();
 
    creep = World.createCreep("Upgrader", "upgrader");
})

test("If full, goes into upgrading mode", () => {
    creep.carry.energy = 50;
    role.execute(creep);
    expect(creep.memory.mode).toBe("upgrade");
    expect(creep.upgradeController).toHaveBeenCalledWith(Game.rooms.W0N0.controller);
});

test("If half empty, stays in upgrading mode", () => {
    creep.carry.energy = 20;
    creep.memory.mode = "upgrade";
    
    role.execute(creep);
    expect(creep.memory.mode).toBe("upgrade");
});

test("If empty, goes into harvest mode", () => {
    creep.carry.energy = 0;
    creep.memory.mode = "upgrade";
    
    role.execute(creep);
    expect(creep.memory.mode).toBe("harvest");
});