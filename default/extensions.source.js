Object.defineProperty(
    Source.prototype,
    "plains", {
        get: function() {
            if (this._plains) {
                return this._plains;
            }
            let surroundings = this.room.lookAtArea(
                this.pos.y - 1,
                this.pos.x - 1,
                this.pos.y + 1,
                this.pos.x + 1,
                true
            );
            this._plains = _.filter(surroundings, s => s.terrain === "plain");
            return this._plains;
        },
        enumerable: false,
        configurable: true
    }
);