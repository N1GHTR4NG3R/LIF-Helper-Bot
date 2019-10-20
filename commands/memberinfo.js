const Discord = require("discord.js");
module.exports = {
    name: 'memberinfo',
    cooldown: 5, // timer to avoid Spam
    description: 'Command for member/user information',

    run(bot, message, args) {
        try {  
            if(message.mentions.users.first()) { // check if there's first() mention in the message
                //creating some variables to make a better read embed
                const user = message.mentions.users.first();
                const member = message.mentions.members.first();
                let userCreated = user.createdAt.toString().split(' '); // split the date for better reading
                let memberJoined = member.joinedAt.toString().split(' '); // split the date for better reading

                let embed = new Discord.RichEmbed() // creates embed with user information
                    .setTitle(`This is the ${user.tag}'s info`)
                    .setDescription(`Requested by ${message.author}`)
                    .setThumbnail(user.avatarURL)
                    .addField("Username", `${user.tag}`, true)
                    .addField("ID", `${user.id}`, true)
                    .addField("Created at", `${userCreated[2]} ${userCreated[1]} ${userCreated[3]}`, true)
                    .addField("Joined at", `${memberJoined[2]} ${memberJoined[1]} ${memberJoined[3]}`, true)
                    .addField("Roles", member.roles.filter(role => role.name !== '@everyone').map(r => `${r}`).join(' | '), true, true)
                    // Design 
                    .setColor("#428745")
                    .setTimestamp()
                    .setFooter(`© 2019 - MemberInfo by Munes • LiF Helper`,"https://lifeisfeudal.com/templates/atomic/favicon.ico");
                
                return message.channel.send(embed);

            } else { // if there's no mention, the embed will be the author's info
                //creating some variables to make a better read embed
                const user = message.author;
                const member = message.member;
                let userCreated = user.createdAt.toString().split(' ');
                let memberJoined = member.joinedAt.toString().split(' ');

                let embed = new Discord.RichEmbed() // creates embed with user information
                    .setTitle(`This is your info`)
                    .setDescription(`Requested by yourself`)
                    .setThumbnail(user.avatarURL)
                    .addField("Username", `${user.tag}`, true)
                    .addField("ID", `${user.id}`, true)
                    .addField("Created at", `${userCreated[2]} ${userCreated[1]} ${userCreated[3]}`, true)
                    .addField("Joined at", `${memberJoined[2]} ${memberJoined[1]} ${memberJoined[3]}`, true)
                    .addField("Roles", member.roles.filter(role => role.name !== '@everyone').map(r => `${r}`).join(' | '), true, true)
                    // Design 
                    .setColor("#428745")
                    .setTimestamp()
                    .setFooter(`© 2019 - MemberInfo by Munes • LiF Helper`,"https://lifeisfeudal.com/templates/atomic/favicon.ico");
                
                return message.channel.send(embed);
            }

        } catch (e){
            console.log(e.stack);
        }
    }
};
