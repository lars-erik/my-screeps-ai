global.Source = class Source extends RoomObject {
    constructor(id, props) {
        super();
        this.id = id;
        Object.assign(this, props);
    }
}