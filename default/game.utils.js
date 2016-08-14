module.exports = {
    init: function(game) {
        game.utils = {
            listCreeps: function () {
                var creeps = _.sortBy(Game.creeps, function (creep) {
                    return creep.room.roomName + creep.name;
                }),
                    i;
                for (i = 0; i < creeps.length; i++) {
                    console.log(creeps[i].name + " (" + creeps[i].memory.level + ") " + JSON.stringify(creeps[i].memory));
                }
                return "";
            }
        }
    }
}