const Item = require('./item.js');

/**
 * @description Class used to hold a list of items and allow operations, filtering, etc on the items
 */

class Category {

    /**
     * @description Instantiates the Category with name and empty item list
     * @param {*} name Name of this category, for easier access to this info later
     */
    constructor(name) {
        this.Name = name;
        this.Items = [];
    }

    /**
     * @description Getter that returns the number of items this category object has
     */
    get length() {
        return this.Items.length;
    }

    /**
     * @description Instantiate item object and add it to Items array
     * @param {*} rawItem Raw item data from items.json
     */
    addItem(rawItem) {
        // If not Item object, assuem it is JSON item data input, and construct item object from it
        this.Items.push(new Item(rawItem));
    }

    /**
     * @description Adds a item object to category
     * @param {Item} itemObject Raw item data from items.json
     */
    addItemObject(itemObject) {
        this.Items.push(itemObject);
    }

    /**
     * @description Remove the item requested from the category
     * @param {Item} item Item object which to delete (must be correct reference for now)
     */
    removeItem(item) {
        let index = this.Items.indexOf(item)
        if (index >= 0) {
            // remove the item found by index
            this.Items = this.Items.splice(index, 1);
        } else {
            // Item was not found
        }
    }

    /**
     * @description Receives string which to use to match with current items
     * @param {string} searchString string used to match with current items
     * @returns an array of item objects that match the search string
     */
    filterItems(searchString) {
        let filteredItems = [];
        for (const item of this.Items) {
            if (this.itemMatches(item.Name,searchString)){
                filteredItems.push(item);
            }
        }
        return filteredItems;
    }

    /**
     * @description Use to get a new category object with items filtered
     * @param {string} searchString string used to match with current items
     * @returns a new Category object with only items that provide match the search string
     */
    filterItemsToCategory(searchString) {
        const filteredCategory = new Category(this.Name);
        const filteredItems = this.filterItems(searchString);

        for (const item of filteredItems) {
            filteredCategory.addItem(item);
        }
    
        return filteredCategory;
    }

    // TODO: Separate the searching logic  to some other class maybe
    itemFullyMatches(itemName, searchTerm) {
        // Only exact matches
        return itemName.toLowerCase() == searchTerm.toLowerCase();
    }
    
    /**
     * @description Sets to lowercase and matches if search term is a substring of item string
     * @param {string} itemName Name of the item to match with search string
     * @param {string} searchTerm Search term to use for matching
     */
    itemMatches(itemName, searchTerm) {
        // Check for substring - return true if found
        return (itemName.toLowerCase()).indexOf(searchTerm.toLowerCase()) > -1;
    }
    
    /**
     * @description Creates a string from this category and all its items
     * @returns String with all item data
     */
    toString() {
        let outputString = this.Name + "\n";
        for (const item of this.Items) {
            outputString += item.toString();
        }
        return outputString;
    }

    /**
     * @description Creates a list of all items belonging to this category
     * @returns A string of the category and list of items
     */
    listItems() {
        let outputString = this.Name + ":\n";
        for (const item of this.Items) {
            outputString += "-" + item.Name + "\n";
        }
        return outputString;
    }

    /**
     * @description Lists all item names from this category in a numbered manner.
     * @param {number} startingNumber From which number the category should start counting. Default is 1 if not provided
     */
    listItemsNumbered(startingNumber = 1) {
        let outputString = this.Name + ":\n";

        for (const item of this.Items) {
            outputString += startingNumber + " - " + item.Name +"\n";
            startingNumber ++;
        }
        return outputString;
    }
}

module.exports = Category;