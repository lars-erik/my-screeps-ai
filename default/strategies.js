let strategies = {
    create(type, key) {
        let strategy = strategies[type][key];
        if (!strategy) {
            console.log("Invalid strategy " + key + ". Defaulting to level1.");
            strategy = strategies[type]["level1"];
        }
        return strategy;
    },
    room: {
        level1: require("./strategies.room.level1"),
        level2: require("./strategies.room.level2")
    },
};

module.exports = strategies;