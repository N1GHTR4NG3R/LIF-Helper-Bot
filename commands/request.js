// Classes
const Category = require('../classes/category.js');
const RequestData = require('../classes/requestData.js');
const EmbedGenerator = require('../classes/embedGenerator.js');
const InputInterpreter = require('../classes/inputInterpreter.js');

// Category resources
const categories = require('../assets/items.json');

module.exports = {
	name: 'request',
	// Timer to avoid Spam, Useful with API's
	cooldown: 5,
	description: 'Request command to filter into correct channels!',
	run(bot, message, args, owner, requestArray) {
		
		// Define guild
		const guild = message.guild;

		
		const embedGen = new EmbedGenerator();
		
		// Define Channels to be used:
		const reqs = guild.channels.find(channel => channel.name == 'requests'); 	    // Requests
		const pendReqs = guild.channels.find(channel => channel.name == 'pending'); 	// Pending
		const accReqs = guild.channels.find(channel => channel.name == 'accepted');	 	// Accepted
		const comReqs = guild.channels.find(channel => channel.name == 'completed'); 	// Completed

		// Only accept requests from requests channel
		if (message.channel != reqs) {
			return;
		}

		// Collect and instantiate all category and item objects, to be used later
		// I advise not to change this data on the fly
		// ============================================================================================
		
		// Start building the request object with data provided - Get the Category
		let requestObject = new RequestData();
		requestObject.setRequester(message.author);
		requestObject.setGuild(guild);
		requestObject.setRequestMessage(message);

		let allCraftingCategories = [];
		for (const category in categories.Crafting) {
			let tmpCategory = new Category(category);
			for (const item of categories.Crafting[category]) {
				tmpCategory.addItem(item);
			}
			allCraftingCategories.push(tmpCategory);
		}
		// =============================================================================================
		/**
		 * @description Get all the items in an array for numbering purposes or whatever
		 * @param {Category[]} categories An array of Category objects object
		 * @returns An array of Item objects, all taken from the Category array passed
		 */
		function flattenItemsOfCategories(categories) {
			var flatItemList = [];
			for (const cat of categories) {
				// ... is a deconstructor, basicaly turns [a, b] to a, b, and Items is an array
				flatItemList.push(...cat.Items)
			}
			return flatItemList;
		}
		
		///////////// Actual app stuff that uses functions above //////////

		const interpreter = new InputInterpreter();

		// This is an array for multiple items requested sometime in the future
		const requested = interpreter.interpret(args);
		const filteredCategories = [];

		// For each request from array above filter a category. Needs work when multiple at once is allowed (IF it will be allowed)
		for (const singleRequest of requested) {

			// Since only ONE request is used for now, the command can be set to request object
			requestObject.setRequestCommand(singleRequest);

			for (const category of allCraftingCategories) {
				let tmpFilteredCategory = category.filterItemsToCategory(singleRequest.RequestedString);
				if (tmpFilteredCategory.Items.length > 0) {
					filteredCategories.push(tmpFilteredCategory);
				}
			}
		}		

		if (filteredCategories.length > 0) {
			items = flattenItemsOfCategories(filteredCategories);
			if (items.length == 1) {
				// If 1 item output here
				const quantity = requested[0].Quantity;

				// Add to request object once the item is determined 
				requestObject.setItem(items[0]);
				const pendEmbed = embedGen.generateItemRequest(message.author.username, items[0], quantity);

				// This part ensures that we have a reference to the message that THIS bot embeds to the "pending" channel
				// TODO: This filter has to be done smarter if this is going to be resistant to multiple reqs at once!!
				let filterMyMsgs = msg => true; 
				// Set up awainting, then later send message
				pendReqs.awaitMessages(filterMyMsgs, { max: 1, time: 30000, errors: ['time'] })
				.then((collected) => {
					// Get the message then put it in the array so it is accessible to the rest of the bot code
					let botPendingMsg = collected.first();
					requestObject.setPendingMessage(botPendingMsg);
					requestObject.setState("Pending");
					requestArray.push(requestObject);
					console.log("Request array now has " + requestArray.length + " Objects!");
				});
				pendReqs.send(pendEmbed);
			} else {
				// If multiple items output here!

				// Construct the message for choosing the item
				response  = ""
				let number = 1;
				for (const cat of filteredCategories) {
					response += cat.listItemsNumbered(number);
					number = number + cat.Items.length;
				}

				// This part checks for message length - if too many characters, then inform the user and stop the script call
				if (response.length > 1950) {
					response = "Too many items match the request! Please be more specific.";
					message.author.send(response);
					return;
				}

				// First create a DM channel towards the message user, then send him the messages. This way awaitMessages can be used
				message.author.createDM().then((userPmChannel) => {
					// Send private message once the channel is initialized / found
					userPmChannel.send(response)
					.then(() => {
						// Use only messages that are numbers
						let filter = msg => parseInt(msg.content) != NaN; 
						
						userPmChannel.awaitMessages( filter , { max: 1, time: 15000, errors: ['time'] })
						.then((collected) =>  {
							// TODO: Put all this in a response manager class
							let responseMsg = collected.first();

							// Reduced by one since the first number in print is 1, not 0
							var numberEntered = parseInt(responseMsg.content) -1; 

							// Check that the response is a number, and between allowed numbers
							if (numberEntered >= 0 && numberEntered < items.length) {
								var requestedItem = items[numberEntered];

								// Define embeds
								const quantity = requested[0].Quantity;
								// Add to request object once the item is determined 
								requestObject.setItem(requestedItem);
								const pendEmbed = embedGen.generateItemRequest(responseMsg.author.username, requestedItem, quantity);

								// This part ensures that we have a reference to the message that THIS bot embeds to the "pending" channel
								// TODO: This filter has to be done smarter if this is going to be resistant to multiple reqs at once!!
								let filterMyMsgs = msg => true; 
								// Set up awaiting, then later send message
								pendReqs.awaitMessages(filterMyMsgs, { max: 1, time: 15000, errors: ['time'] })
								.then((collected) => {
									// Get the message then put it in the array so it is accessible to the rest of the bot code
									let botPendingMsg = collected.first();
									requestObject.setPendingMessage(botPendingMsg);
									requestObject.setState("Pending");
									requestArray.push(requestObject);
									console.log("Request array now has " + requestArray.length + " requests!");
								}).catch((error) => {
									responseMsg.author.send("Timed out");
								});
								// Output Request
								pendReqs.send(pendEmbed);
							} else {
								responseMsg.author.send("Invalid");
							}
						})
						.catch(err => {
							console.log("Error in waiting for message?", err);
						}); 
					})
					.catch(err => {
						console.log("Error in sending message?", err);
					});

				});
			}
		} else {
			console.log("No items found!");
			message.author.send("No items found!");
		}
	}
};
