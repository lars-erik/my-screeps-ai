global.spawnSimple = function(body = [MOVE,CARRY,WORK], name = "c" + Game.time) {
    Game.spawns.Spawn1.spawnCreep(body, name);
}