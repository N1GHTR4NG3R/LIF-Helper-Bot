const Discord = require('discord.js');

/**
 * @description Class used to centralise where/how embeds are created - Also helps reduce clutter in other parts of code
 */
class EmbedGenerator {

    /**
     * @description Generates the embed object for responding to item request
     * @param {string} username Name of the user that made the item request
     * @param {Item} item Item object for which to generate request
     * @param {number} quantity Number of items requested
     */
    generateItemRequest(username, item, quantity = 1) {
        const pendEmbed = new Discord.RichEmbed()
        .setColor('#1eb7d9')
        .setTitle(username + ' has requested an item')
        .setDescription('Item Requested')
        .addField(`__Category:__`, item.Category)
        .addField(`__Item:__`, item.Name + " x " + quantity)
        .addField(`__Skill:__`, item.Skill)
        .addField(`__Resources:__`, item.resourcesToString(quantity))
        .setThumbnail('https://i.imgur.com/hmWTeKv.png')
        .setFooter(' © LIF Helper Bot - 2019');
        return pendEmbed;
    }

    generateAcceptedRequest(user, requestData) {
        const item = requestData.Item;
        const pendEmbed = new Discord.RichEmbed()
        .setColor('#1eb7d9')
        .setTitle(user.username + ' has accepted an item request')
        .setDescription('Item Request Accepted')
        .addField(`__Requester:__`, requestData.Requester.username)
        .addField(`__Category:__`, item.Category)
        .addField(`__Item:__`, item.Name + " x " + requestData.RequestCommand.Quantity)
        .setThumbnail('https://i.imgur.com/hmWTeKv.png')
        .setFooter(' © LIF Helper Bot - 2019');
        return pendEmbed;
    }

    generateCompletedRequest(user, requestData) {
        const item = requestData.Item;
        const pendEmbed = new Discord.RichEmbed()
        .setColor('#1eb7d9')
        .setTitle(user.username + ' has completed an item request')
        .setDescription('Item Request Completed')
        .addField(`__Requester:__`, requestData.Requester.username)
        .addField(`__Completer:__`, requestData.Taker.username)
        .addField(`__Item:__`, item.Name + " x " + requestData.RequestCommand.Quantity)
        .setThumbnail('https://i.imgur.com/hmWTeKv.png')
        .setFooter(' © LIF Helper Bot - 2019');
        return pendEmbed;
    }
}

module.exports = EmbedGenerator;