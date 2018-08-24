let World = require("./world");
let strategies = require("./../default/strategies");

beforeEach(() => {
    World.init();
});

test("Creates strategy implementation", () => {
    let strategy = strategies.create();
    expect(strategy instanceof strategies.types.Initial);
});