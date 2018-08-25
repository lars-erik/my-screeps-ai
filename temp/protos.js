Object.defineProperty(
    Room.prototype,
    "sources", {
        get: function() {
            if (this._sources) {
                return this._sources;
            }
            return this._sources = this.find(FIND_SOURCES);
        },
        enumerable: false,
        configurable: true
    }
);

Object.defineProperty(
    Source.prototype,
    "freeSpots", {
        get: function() {
            if (this._freeSpots) {
                return this._freeSpots;
            }
            let freeSpots = [],
                top = this.pos.y - 1,
                left = this.pos.x - 1,
                bottom = this.pos.y + 1,
                right = this.pos.x + 1,
                surroundings = this.room.lookAtArea(top, left, bottom, right);
            
            for(let y = top; y<=bottom; y++) {
                for(let x = left; x<=right; x++) {
                    if (surroundings[y][x].length === 1 && surroundings[y][x][0].terrain === "plain") {
                        freeSpots.push(Object.assign(surroundings[y][x][0], {x:x,y:y}));
                    }
                }
            }
            
            return this._freeSpots = freeSpots;
        },
        enumerable: false,
        configurable: true
    }
);

StructureSpawn.prototype.showRoomStatus = function() {
    this.room.visual.text(
        '💎️' + this.room.sources.length + " sources",
        this.pos.x + 1, 
        this.pos.y, 
        {align: 'left', opacity: 0.8}
    )
    this.room.visual.text(
        '💎️' + this.room.energyAvailable + " energy",
        this.pos.x + 1, 
        this.pos.y + 1, 
        {align: 'left', opacity: 0.8}
    )
}

global.toJson = function(obj) {
    return JSON.stringify(obj, null, "\t");
}