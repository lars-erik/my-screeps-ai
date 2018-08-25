require("./protos");

global.doesThisWork = () => {
    let source = Game.creeps.M4.pos;
    let goal = {
        pos: Game.getObjectById("acc6320d44ec5d963f8c83c3").pos, 
        range: 1
    };
    let opts = {
        roomCallback: function (roomName) {
            let room = Game.rooms[roomName];
            let costs = new PathFinder.CostMatrix();
            room.find(FIND_CREEPS).forEach(c => {
                costs.set(c.pos.x, c.pos.y, 0xFF); 
            });
            return costs;
        }
    };
    let result = PathFinder.search(source, goal, opts);
    return JSON.stringify(result, null, "\t");
}

module.exports.loop = function () {

}