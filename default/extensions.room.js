Room.prototype.execute = function() {
    let key = "level" + this.controller.level;
    let strategy = Strategies.create("room", key);
    strategy.execute(this);
}

Object.defineProperty(
    Room.prototype,
    "reservations", {
        get: function() {
            return this.memory.reservations
                || (this.memory.reservations = {});
        },
        configurable: true,
        enumerable: false
    }
)

Object.defineProperty(
    Room.prototype,
    "constructionSites", {
        get() {
            if (this._constructionSites) {
                return this._constructionSites;
            }
            return this._constructionSites = this.find(FIND_CONSTRUCTION_SITES, {filter:{my:true}});
        },
        configurable: true,
        enumerable: false
    }
)

Room.prototype.unreserve = function(x, y) {
    let key = "";
    if (x.hasOwnProperty("x")) {
        key = x.x + "," + x.y;
    } else {
        key = x + ',' + y;
    }
    let reservedName = this.reservations[key];
    console.log("deleting reservation " + key + " named " + reservedName);
    delete this.reservations[key];
}

Room.prototype.isReserved = function(x, y) {
    let key = x + ',' + y;
    if (this.reservations[key]) {
        return true;
    }
    return false;
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
