const Discord = require('discord.js');
const EmbedGenerator = require('../classes/embedGenerator.js');

// The "global" requestArray access - used to get currently active requests - Smart :P
const requestArray = require('../Guildlife.js');

module.exports = (bot, reaction, member) => {
	// Define the guild
	let guild = reaction.message.guild;

	// Define the member
	let user = guild.member(member);

	// Log User and Guild
	console.log(`${member.username} - ${guild.name}`);

	// Initialize the Embed Generator class
	embedGen = new EmbedGenerator();

	// Grab the channels to be used
    const accReqs = guild.channels.find(channel => channel.name == 'accepted');	 	// Accepted
    const complReqs = guild.channels.find(channel => channel.name == 'completed');	 	// Completed

	// Loop through all requests and find which request message this is related to
	for (const requestData of requestArray) {

		// PENDING MESSAGE REACTION
		// If pending message id matches, generate the embed and send it
		if (reaction.message.id == requestData.PendingMessage.id && reaction.emoji.name == '✅'){
			// This console.log spams the console :D
			// console.log("Accepting request: pending message is", requestData.PendingMessage);
			let accEmbed = embedGen.generateAcceptedRequest(member, requestData);
			requestData.setTaker(member);
			requestData.setState("Accepted");

			// TODO: Send notification to requester?

			// TODO: This filter has to be done smarter if this is going to be resistant to multiple reqs at once!!
			let filterMyMsgs = msg => true; 
			accReqs.awaitMessages(filterMyMsgs, { max: 1, time: 15000, errors: ['time'] })
			.then((collected) => {
				// Get the message then put it in the array so it is accessible to the rest of the bot code
				let botAcceptedMsg = collected.first();

				requestData.setAcceptedMessage(botAcceptedMsg);
				// Delete the pending message so it cannot be accepted again
				requestData.PendingMessage.delete();
				requestData.setState("Accepted");

				// TODO: Update database

				// Should here the requested message be deleted? ==== Yes!
			});
			accReqs.send(accEmbed);
			
			// Log the action
			console.log(`${member.username} accepted a request`);
			break;
		}
		// ACCEPTED MESSAGE REACTION
		// If accepted message id matches, generate the embed and send it
		if (requestData.AcceptedMessage && reaction.message.id == requestData.AcceptedMessage.id && reaction.emoji.name == '✅'){
			let complEmbed = embedGen.generateCompletedRequest(member, requestData);
			requestData.setState("Completed");
			complReqs.send(complEmbed);
			requestData.AcceptedMessage.delete();

			// TODO: Send notification to requester?

			// Get the index and remove element from array
			const indexToRemove = requestArray.indexOf(requestData);
			if (indexToRemove > -1) {
				requestArray.splice(indexToRemove, 1)
			}
			// TODO: Update database
			break;
		}
	}
};