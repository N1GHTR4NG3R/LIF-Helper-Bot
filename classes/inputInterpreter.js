
const RequestCommand = require('./requestCommand.js');

class InputInterpreter {

    constructor () {
        this.qualityMark = "q";
        this.quantityMark = "x";
    }

    /**
     * 
     * @param {} args Arguments - a string array - to interpret
     * @returns an array of request command objects - containing item, quality, quantity - if provided
     * @todo Define final behavior (or steps), and finish it!
     */
    interpret(args) {
        
        // TODO - make it smarter! - more items, quantity/quality options, watch for order of words, etc
        let itemString = "";
        let quality = null;
        let quantity = null;
        for (const word of args) {
            if (this.isQuality(word)) {
                // Set quality if matches, and remove all non-numberic characters
                quality = parseInt(word.replace(/\D/g,''));
            } else if (this.isQuantity(word)) {
                // Set quantity if matches, and remove all non-numberic characters
                quantity = parseInt(word.replace(/\D/g,''));
            } else if (quality == null && quantity == null){
                // If quality and quantity are not set, add the word to item name. This means that no commands are encountered yet. No words should be added if special commands started
                // Could be discussed i guess
                itemString += word + " ";
            }
        }

        let reqCommand = new RequestCommand(itemString.trim(), quantity, quality);
        return [reqCommand];
    }

    /**
     * @description Find if string provided describes quality
     * @param {string} word Parameter string to check if it matches structure for quality
     * @returns Boolean truw if word matches quality structure (q45 or 54q)
     */
    isQuality(word) {
        const isNubmer = parseInt(word) != NaN;
        // Return true if condition below is true
        return isNubmer && (word.startsWith(this.qualityMark) || word.endsWith(this.qualityMark));
    }

    /**
     * @description Find if string provided describes quantity
     * @param {string} word Parameter string to check if it matches structure for quantity
     * @returns Boolean truw if word matches quantity structure (x45 or 54x)
     */
    isQuantity(word) {
        const isNubmer = parseInt(word) != NaN;
        // Return true if condition below is true
        return isNubmer && (word.startsWith(this.quantityMark) || word.endsWith(this.quantityMark));
    }
}

module.exports = InputInterpreter;