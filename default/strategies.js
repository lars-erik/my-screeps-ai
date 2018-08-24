module.exports = {
    create(key) {
        let fn = module.exports.levels[key];
        if (!fn) {
            console.log("Invalid strategy " + key + ". Defaulting to level1.");
            fn = module.exports.levels["level1"];
        }
        return new fn();
    },
    levels: {
        level1: require("./strategies.level1")
    }
}