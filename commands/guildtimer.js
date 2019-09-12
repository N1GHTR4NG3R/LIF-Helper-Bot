module.exports = {
	name: 'guildtimer',
	// Timer to avoid Spam, Useful with API's
	cooldown: 5,
	description: 'Command to work out and Monitor Guild Claim Timer',
	run(bot, message, args, owner, requestArray) {
        // User to input monument support points
        // Using only messages that are numbers 

        // Create the DM channel so you can have the reference on the dmChannel - otherwise you cant await messages correctly - the message.channel in this context is your general channel or any other!!!
        message.author.createDM().then((userDmChannel) => {
            console.log("CREATED DM SUCCESSFULLY");

            // Send the message to the DM, but only AFTER that (in .then) start awaiting messages. That ensures that the bots own message isnt collected
            userDmChannel.send("How many support points does your monument have?")
            .then(() => {
                // First create the awaiting of message
                let supportPoint = message => parseInt(message.content) > 0;
                userDmChannel.awaitMessages(supportPoint, {max: 1, time: 20000, errors: ['time']})
                .then((collected) => {
                    let userReply1 = collected.first();
                    // Same as before, first send the message and only after initiating wait for response
                    userDmChannel.send("What is your support point cost per day?")
                    .then(() => {
                        let supportCost = message => parseInt(message.content) > 0;
                        userDmChannel.awaitMessages(supportCost, {max: 1, time: 20000, error: ['time']})
                        .then((cost) => {   
                            let userReply2 = cost.first();
                            if (userReply1 && userReply2){
                                let divide = userReply1 / userReply2;
                                let divide2 = divide / 5;
                                const i = divide2;
                                const d = i | 0;
                                const h = (i - d) * 24 | 0;
                                const m = ((i - d) * 24) * 60 % 60 | 0;
                                userDmChannel.send(`You have ${d} days and ${h} hours and ${m} minutes left`);
                            }
                        }).catch(err => {
                            console.log('Error on UserReply2', err);
                        });
                    }).catch((err) => {
                        console.log(`Failed to send DM: `, err);
                    });
    
                }).catch(err => {
                    console.log('Error on userReply1', err);
                });
            });

        }).catch((err) => {
            message.author.send("There was an error. Please try again!");
        });
    }
}