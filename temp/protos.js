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
    "plains", {
        get: function() {
            if (this._plains) {
                return this._plains;
            }
            let plains = [],
                top = this.pos.y - 1,
                left = this.pos.x - 1,
                bottom = this.pos.y + 1,
                right = this.pos.x + 1,
                surroundings = this.room.lookAtArea(top, left, bottom, right, true);
            
            return this._plains = _.filter(surroundings, x => x.terrain === "plain");
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

Object.defineProperty(
    Creep.prototype,
    "workCapacity", {
        get: function() {
            if (this._workCapacity) {
                return this._workCapacity;
            }
            return this._workCapacity = _.filter(this.body, x => x.type === WORK).length;
        },
        enumerable: false,
        configurable: true
    }
);

Creep.prototype.totalTicksToFill = function() {
    return Math.ceil(this.carryCapacity / (this.workCapacity * 2));
}

Creep.prototype.harvestRoundtripTime = function(spawn, source) {
    let path = spawn.pos.findPathTo(source, { range: 1 }),
        dist = path.length,
        roundtripTime = dist * 2,
        totalTime = roundtripTime + this.totalTicksToFill();
    return totalTime;
}

Creep.prototype.ticksUntilFull = function() {
    let energyPerTurn = this.workCapacity * 2;
    let roomLeft = this.carryCapacity - _.sum(this.carry);
    let ticksLeft = roomLeft / energyPerTurn;
    return Math.ceil(ticksLeft);
}

global.toJson = function(obj) {
    return JSON.stringify(obj, null, "\t");
}