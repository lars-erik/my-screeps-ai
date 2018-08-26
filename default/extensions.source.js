
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
                    if (surroundings[y]
                        && surroundings[y][x]
                        && surroundings[y][x].length === 1 
                        && surroundings[y][x][0].terrain === "plain") {
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