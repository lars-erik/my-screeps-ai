let Mem = require("./utils.mem");

let types = {
    Initial: require("./strategies.initial")
}

module.exports = {
    create() {
        let gameState = Mem.get("gameState", {});
        let strategy = Mem.get("strategy", "Initial", gameState);
        let fn = types[strategy];
        if (!fn) {
            console.log("Invalid strategy " + strategy + ". Swapping to initial.");
            strategy = Memory.gameState.strategy = "Initial";
            fn = types[strategy];
        }
        return new fn();
    },
    types: types
}