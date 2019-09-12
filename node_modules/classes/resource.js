

class Resource {
    constructor(name, quantity) {
        this.Name = name;
        this.Quantity = quantity;
    }

    toString() {
        return this.Name + " x " + this.Quantity;
    }
}

module.exports = Resource;