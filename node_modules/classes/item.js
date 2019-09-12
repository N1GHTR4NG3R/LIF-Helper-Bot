const Resource = require('./resource.js');

class Item {

    /**
     * @description Reads all properties of itemObject and appends them to this object
     * @param {JSON object read from resources} itemObject Used to construct this object
     */
    constructor(itemObject) {
        // Append all item properties to this object
        for (var property in itemObject) {
            this[property] = itemObject[property];
        }
    }

    /**
     * @description Prints all the item data with possibility for multiplied resources
     * @param {number} quantity Number of items for which to print the info - will multiply resources
     * @returns String
     */
    toString(quantity = 1) {
        let resourceString = this.resourcesToString(quantity);

        let itemString =
        "Name:" + this.Name + "\n"+
        "Category:" + this.Category + "\n"+
        "Weight:" + this.Weight + "\n"+
        "Skill:" + this.Skill + "\n"+
        "Tool:" + this.Tool + "\n"+
        "Device:" + this.Device + "\n"+
        "MSRP:" + this.MSRP + "\n"+
        "Resources: " + resourceString; 
 
        return itemString.trimRight();
    }

    /**
     * @description  Prints the resources, can be multiplied by quantity
     * @param {number} quantity Number of items to get resource string for - multiplies resources. Must be greater than 0
     * @returns String
     */
    resourcesToString(quantity = 1) {
        let resources = this.getResourcesNeeded(quantity);
        let resourceString = "";
        for (const res of resources) {
            resourceString += res.toString() + ", ";
        }
        // remove last 2 chars (", ")
        return resourceString.slice(0, -2);
    }

    /**
     * @description Parses resurces one by one and constructs Resource objects from them
     * @param {number} quantity Number of items to get resource objects for - multiplies resources. Must be greater than 0
     * @returns Resource object array
     */
    getResourcesNeeded(quantity = 1) {
        quantity = parseInt(quantity);

        // Dont allow quantity fuckery - if wrong use 1
        if (quantity == NaN || quantity < 1) quantity = 1;

        let resources = [];

        for (const resourceString of this.Resources) {
            let parsedResource = this.parseResource(resourceString);
            parsedResource.Quantity = parsedResource.Quantity * quantity;
            resources.push(parsedResource);
        }

        return resources;
    }

    /**
     * @description Uses the string provided to create a Resource object
     * @param {string} resourceString The string with resurce as collected from ther resources items.json. Must be in form of : "Resource name x quantity" - the " x " is important
     * @returns Resource object parsed from the string
     * @todo Manage what happens if string doesnt contain " x "
     */
    parseResource(resourceString) {
        let splitResource = resourceString.split(" x ");
        let resource = new Resource(splitResource[0], parseInt(splitResource[1]))
        return resource;
    }
}

module.exports = Item;