// Import the Discord.JS module - Will need installing
const Discord = require('discord.js');

// Calls the respective file system
const fs = require('fs');

// Get the configuration file from config
const { prefix, ownerID, token } = require('./assets/config.json');

// Bring the Bot alive
const bot = new Discord.Client();

// The current requests in memory - on starting the bot it is empty, and is updated when requests are made
const requestsArray = [];

// Calls upon Bot Commands
bot.commands = new Discord.Collection();

// Create the command handler fs
fs.readdir(__dirname+'/commands/', (err, files) => { // Reads commands folder directory
	if (err) console.error(err); // Sends an error message if commands has an error;
	const commandFiles = files.filter(f => f.split('.').pop() === 'js');
	if (commandFiles.length <= 0) {return console.log('No commands found');}
	else {console.log(commandFiles.length + ' commands Found');}

	commandFiles.forEach((f) => {
		const command = require(`./commands/${f}`);
		console.log(`Command ${f} loaded`);
		bot.commands.set(command.name, command);
	});
});

// Create the event handler fs
fs.readdir(__dirname+'/events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		bot.on(eventName, event.bind(null, bot));
	});
});

// Cooldown Loop
const cooldowns = new Discord.Collection();

// Initiate ready state - Only after this is activated, will the bot work!
bot.on('ready', async () => {
	const guildNames = bot.guilds.map(g => g.name).join("\n");
	console.log(guildNames);
	console.log(`Lif Guilds is alive and kicking on ${bot.guilds.size} guild(s)!`);

	// Set the bots current activity
	bot.user.setActivity("Listening!");
});

bot.on('message', (message) => {

	// Check Prefix and do nothing if the writer is a bot! Otherwise endless loop...
	try {
		if(!message.content.startsWith(prefix) || message.author.bot) return;
	} catch {
		return
	}

	// Remove the Prefix and put all commands into lower case
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	// If no command then do nothing
	const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if(!command) return;

	// Check to see if the command is limited to guild only
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply("This command isn't available here!");
	}

	// Check if there is an actual command if prefix is used
	if (command.args && !args.length) {
		return message.channel.send(`And how am I meant to know what you want me to do ${message.author}!`);
	}

	// Declare Owner
	const owner = (ownerID);
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	// Set a Cooldown period
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 5) * 1000;

	// Check the authors message time and compare with the cooldown timer!
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		// If Cooldown still active, Inform author.
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Stop trying to cook me!, You need to wait ${timeLeft.toFixed(1)} more second(s)... then you can try again!`);
		}
	}
    
    // Set author message time with the timestamp
	timestamps.set(message.author.id, now);

	// Create timeout as a callback if above if statement does not remove author timestamp 
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	// If command, get command and execute it
	try {
		command.run(bot, message, args, owner, requestsArray);
	} // If something goes wrong, report back
	catch (error) {
		console.error(error);
		message.reply("There was an error executing that command!");
	}
});

// Handle rejected promises - no advanced implementation yet, just ensuring they are caught
process.on('unhandledRejection', error => {
	// Prints "unhandledRejection woops!"
	console.log('unhandledRejection', error);
});

// Interval used to track the current number of requests - Currently commented out as not working properly
/* setInterval(() => {
	let pending = 0;
	let accepted = 0;
	for (const req of requestsArray) {
		if (req.State === "Pending") pending++;
		if (req.State === "Accepted") accepted++;
	}
	console.log("Current number of requests:");
	console.log("Pending: " + pending);
	console.log("Accepted: " + accepted);
	// 30 minutes = 1800000
}, 1800000);
*/
// Bot log-in details using the token
bot.login(token);

module.exports = requestsArray;
