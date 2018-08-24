Room.prototype.execute = function() {
    let key = "level" + this.controller.level;
    let strategy = Strategies.create(key);
    console.log(strategy.execute);
    strategy.execute(this);
}