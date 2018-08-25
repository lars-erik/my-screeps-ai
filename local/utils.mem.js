module.exports = {
    get: function(key, defaultValue, instance) {
        let target = instance || Memory;
        let value = target[key];
        if (!value) {
            target[key] = value = defaultValue;
        }
        return value;
    }
}