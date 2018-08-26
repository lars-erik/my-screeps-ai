global.Source = class Source {
    constructor(id, props) {
        this.id = id;
        Object.assign(this, props);
    }
}