Room.prototype.execute = function() {
    let key = "level" + this.controller.level;
    let strategy = Strategies.create("room", key);
    strategy.execute(this);
}