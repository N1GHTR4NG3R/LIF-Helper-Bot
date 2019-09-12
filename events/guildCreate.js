const Discord = require('discord.js');
module.exports = (bot, guild) => {
    console.log(`Joined: ${guild.name}`);

    // Create roles and channels seperate, as each creation is a seperate API call!
    // ========================================================================================================
    // Roles
    function defineRoles(){
            const animals = guild.createRole({
                name:'Animals',
                color: 'GREEN',
                permissions: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }).then(role => console.log(`${role.name}`))
            .catch(console.error);

            const blacksmith = guild.createRole({
                name:'Blacksmith',
                color: 'BLACK',
                permissions: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }).then(role => console.log(`${role.name}`))
            .catch(console.error);
            
            const builder = guild.createRole({
                name:'Builder',
                color: 'ORANGE',
                permissions: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }).then(role => console.log(`${role.name}`))
            .catch(console.error);

            const carpenter = guild.createRole({
                name:'Carpenter',
                color: 'YELLOW',
                permissions: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }).then(role => console.log(`${role.name}`))
            .catch(console.error);

            const domestic = guild.createRole({
                name:'Domestic',
                color: 'RED',
                permissions: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }).then(role => console.log(`${role.name}`))
            .catch(console.error);

            const Alchemist = guild.createRole({
                name:'Alchemist',
                color: 'BLUE',
                permissions: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }).then(role => console.log(`${role.name}`))
            .catch(console.error);

            const miner = guild.createRole({
                name:'Miner',
                color: 'PURPLE',
                permissions: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }).then(role => console.log(`${role.name}`))
            .catch(console.error);
    };

    // ====================================== Channels =============================================================

    function defineChannels(){
        // Get Role names as ID needed for Category Permissions
        let animalRole = guild.roles.find(r => r.name == 'Animals');
        let blacksmithRole = guild.roles.find(r => r.name == 'Blacksmith');
        let builderRole = guild.roles.find(r => r.name == 'Builder');
        let carpenterRole = guild.roles.find(r => r.name == 'Carpenter');
        let domesticRole = guild.roles.find(r => r.name == 'Domestic');
        let alchemyRole = guild.roles.find(r => r.name == 'Alchemist');
        let minerRole = guild.roles.find(r => r.name == 'Miner');
        let botRole = guild.roles.find(r => r.name == 'LIF-Helper');


        // Assign Category first
            const Lifguilds = guild.createChannel('Lifguilds', {
                type: 'category',
                topic: 'List of channels for the Lifguilds',
                permissionOverwrites: [
                {
                    id: animalRole.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: blacksmithRole.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: builderRole.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: carpenterRole.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: domesticRole.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: alchemyRole.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: minerRole.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: botRole.id,
                    deny: ['MANAGE_MESSAGES'],
                    allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: guild.id,
                    deny: ['MANAGE_MESSAGES', 'VIEW_CHANNEL', ]
                },
                ]
            }).then(channel => {
                console.log(`Category and channels created on: ${guild.name}`);
            }).catch(console.error);

            // Create Channels and assign to category
            const request = guild.createChannel('requests', {type: 'text', topic: 'Request items here!'})
                .then(async channel => {
                    let category = guild.channels.find(c => c.name == "Lifguilds" && c.type == "category");
                    if (!category){
                        console.log("No Category found!");
                    }else {
                        await channel.setParent(category.id);
                        await channel.lockPermissions();
                    }
                }).catch(console.error);
    
            const pending = guild.createChannel('pending', {type: 'text', topic: 'Request items here!'})
                .then(async channel => {
                    let category = guild.channels.find(c => c.name == "Lifguilds" && c.type == "category");
                    if (!category){
                        console.log("No Category found!");
                    }else {
                        await channel.setParent(category.id);
                        await channel.lockPermissions();
                    }
                }).catch(console.error);

                const accepted = guild.createChannel('accepted', {type: 'text', topic: 'Request items here!'})
                .then(async channel => {
                    let category = guild.channels.find(c => c.name == "Lifguilds" && c.type == "category");
                    if (!category){
                        console.log("No Category found!");
                    }else {
                        await channel.setParent(category.id);
                        await channel.lockPermissions();
                    }
                }).catch(console.error);

                const completed = guild.createChannel('completed', {type: 'text', topic: 'Request items here!' })
                .then(async channel => {
                    let category = guild.channels.find(c => c.name == "Lifguilds" && c.type == "category");
                    if (!category){
                        console.log("No Category found!");
                    }else {
                        await channel.setParent(category.id);
                        await channel.lockPermissions();
                    }
                }).catch(console.error);
    }

    // =======================================================================================================
    console.log(`Joined ${guild.name}`);

    // Check Roles/ Channels and create if not there
      const neededRoles = ['Animals', 'Blacksmithing', 'Builder', 'Carpenter', 'Domestic', 'Alchemist', 'Miner'];
      const findNeeded = guild.roles.some(role => neededRoles.includes(role.name));
      const neededChnl = ['Requests', 'Pending', 'Accepted', 'Completed']
      const chnlNames = guild.channels.some(channel => neededChnl.includes(channel.name));
      if (!findNeeded){
          // Create the roles needed when joining
           defineRoles();
           console.log(`Creating new role's on ${guild.name}`);
           }else {
               console.log("Roles already created or I am unable to make them");
           }
      if (!chnlNames){
          // Put a timer for creating Channels
          const chanCreate = setTimeout(defineChannels, 4000);
          // Create the Channels
          chanCreate;
      } else {
          console.log("Channels already here or I am unable to make them");
      }

    // =========================================================================================================

    function sendWelcome(){
     // Define the welcome embed
        const botJoined = new Discord.RichEmbed()
        .setColor('#6abb44')
        .setTitle('Your Feudal life just got better!')
        .setDescription('Lif Guilds is here to make your experience on Lif:MMO Better')
        .addField('__Message__', 'Please familiarise yourself with how the bot works, If you need any help then feel free to join us at: https://discord.gg/a4zur6B')
        .setThumbnail('https://i.imgur.com/hmWTeKv.png')
        .setFooter(' © Lifguilds - A LIF:MMO Bot');
        const botWelcome = guild.channels.find(channel => channel.name == 'requests');
             botWelcome.send(botJoined).catch(console.error);
    }   
    const sendMessage = setTimeout(sendWelcome, 8000);
    sendMessage;
}