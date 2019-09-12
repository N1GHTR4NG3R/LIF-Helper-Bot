const Discord = require('discord.js');
const requestData = require('../classes/requestData.js');

// Help make the events more readable by filtering for what we need
const eventNames = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
module.exports = async (bot, event) => {
	// Don't run if not related
	if (!eventNames.hasOwnProperty(event.t)) return;

	// Assigning the data
	const { d: data } = event;
	// Log output, COmmented out for future reference if needed!
	// console.log(event); 

	// Grab the User
	const user = bot.users.get(data.user_id);

	// Grab the channels
	const channel = bot.channels.get(data.channel_id);

	// Stops the event executing if message is cached
	if (channel.messages.has(data.message_id)) return;

	// Grab the message
	const verMessage = await channel.fetchMessage(data.message_id);

	// Grab the emoji
	const emojiKey = data.emoji.id ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;

	// Grab the reaction from the message.
	const reaction = verMessage.reactions.get(emojiKey);

	// Adds the reacting User to the reaction users collection
	if (reaction) reaction.users.set(event.d.user_id, bot.users.get(event.d.user_id));

	// Check event type before running
	bot.emit(eventNames[event.t], reaction, user);
};