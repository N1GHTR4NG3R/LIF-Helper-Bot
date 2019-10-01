// Add the filesystem
const fs = require('fs');
// get the sales sheet
fs.readFile('./scraped_files/current_sales.json',
    // callback function that's called when reading a file is done!
    async function(err, data) {
        // json data
        let salesInfo = data;
        // parse Json file
        let sales = JSON.parse(salesInfo);
        // set the loop area
        let salesSheet = sales.data;
        // Item function
        const items = itemInformation(salesSheet);
        await items;
    });

async function itemInformation(salesSheet) {
    
    for (let i = 0; i < salesSheet.length; i++){
        const salesData = salesSheet[i];
        // console.log("Name: " + salesData.Name + " Quality: "+ salesData.Quality + " Price: " + salesData.CoinPrice);
        // Information needed from marketData
        const itemInfo = {
            name: salesData.Name,
            quality: salesData.Quality,
            // imageURL: , - Commented out as will be a future update
            // description: , - Commented out as will be a future update
            quantity: salesData.Quantity,
            price: salesData.CoinPrice,
            baseprice: salesData.BasePrice,
            effects: [{
                description: salesData.Effects.Description,
                influence: salesData.Effects.Influence
            }
            ],
            region: salesData.CreatedRedionID
        }
    }
}