Room.prototype.execute = function() {
    let key = "level" + this.controller.level;
    let strategy = Strategies.create("room", key);
    strategy.execute(this);
}

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
