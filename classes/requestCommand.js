
/**
 * @description Holds information about the request command - what string is searched, what is the quality and quantity
 */
class RequestCommand {
    constructor(reqString, quantity, quality) {
        this.RequestedString = reqString;
        this.Quantity = parseInt(quantity) ? parseInt(quantity) : 1;
        this.Quality = parseInt(quality) ? parseInt(quality) : null;
    }
}

module.exports = RequestCommand;