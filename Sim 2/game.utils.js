module.exports = {
    init: function(game) {
        game.utils = {
            listCreeps: function () {
                var creeps = _.sortBy(Game.creeps, function (creep) {
                    return creep.room.roomName + creep.name;
                }),
                    i;
                for (i = 0; i < creeps.length; i++) {
                    console.log(creeps[i].name + " LVL: " + creeps[i].memory.level + " BP: " + creeps[i].body.length + " " + JSON.stringify(creeps[i].memory));
                }
                return "";
            }
        }
    }
}