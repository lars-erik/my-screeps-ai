/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('building.extensions');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    build: function(spawn) {
        var room = spawn.room,
            pad = 3,
            size = 5,
            half = Math.floor(size / 2),
            area1x = spawn.pos.x - pad - size,
            area2x = spawn.pos.x - half,
            area3x = spawn.pos.x + pad,
            area4x = spawn.pos.x - half,
            area1y = spawn.pos.y - half,
            area2y = spawn.pos.y - pad - size,
            area3y = spawn.pos.y - half,
            area4y = spawn.pos.y + pad,
            area1 = room.lookForAtArea(LOOK_TERRAIN, area1y, area1x, area1y + size, area1x + size, true),
            area2 = room.lookForAtArea(LOOK_TERRAIN, area2y, area2x, area2y + size, area2x + size, true),
            area3 = room.lookForAtArea(LOOK_TERRAIN, area3y, area3x, area3y + size, area3x + size, true),
            area4 = room.lookForAtArea(LOOK_TERRAIN, area4y, area4x, area4y + size, area4x + size, true),
            area1Walls = _.filter(area1, (area) => area.terrain == "wall"),
            area2Walls = _.filter(area2, (area) => area.terrain == "wall"),
            area3Walls = _.filter(area3, (area) => area.terrain == "wall"),
            area4Walls = _.filter(area4, (area) => area.terrain == "wall"),
            areas = [
                {a:area1,w:area1Walls,x:area1x,y:area1y},
                {a:area2,w:area2Walls,x:area2x,y:area2y},
                {a:area3,w:area3Walls,x:area2x,y:area2y},
                {a:area4,w:area4Walls,x:area2x,y:area2y}
            ],
            ordered = areas.sort((areaA, areaB) => {
               if (areaA.w.length < areaB.w.length) return -1; 
               if (areaA.w.length > areaB.w.length) return 1; 
               return 0;
            }),
            area = ordered[0]
            ;
            
        console.log(area.x);
            
    }
};