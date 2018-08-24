let Mem = require("./../default/utils.mem");
let World = require("./world");

beforeEach(() => {
    World.init();
});

test("Initializes memory values to passed defaults", () => {
    let value = Mem.get("key", "initialValue");
    expect(value).toBe("initialValue");
});

test("Leaves memory values intact when existing", () => {
    Memory.key = "editedValue";
    let value = Mem.get("key", "initialValue");
    expect(value).toBe("editedValue");
});