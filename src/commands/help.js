const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "help",
    description: "Help Command",
    execute(client, message, config) {
        let embed = new Discord.MessageEmbed()
            .setAuthor("SignedBot Commands", "https://jailbreaks.app/img/Jailbreaks.png")
            .setURL("https://jailbreaks.app")
            .setFooter("v" + config.version + " | Made by Monotrix & iCraze", "https://monotrix.xyz/assets/images/logo.png")
            .addFields({ name: `**${db.get(`prefix-${message.guild.id}`)}status**`, value: "Gets sign status of Jailbreaks.app." }, { name: `**${db.get(`prefix-${message.guild.id}`)}prefix**`, value: "Change this guilds' prefix for SignedBot." }, { name: `**${db.get(`prefix-${message.guild.id}`)}invite**`, value: "Sends the bot's invite link." }, { name: `**${db.get(`prefix-${message.guild.id}`)}stats**`, value: "Gets this bot's statistics." }, { name: `**${db.get(`prefix-${message.guild.id}`)}optin**`, value: "Opts you in to get DMed when Jailbreaks.app is signed / unsigned." }, { name: `**${db.get(`prefix-${message.guild.id}`)}optout**`, value: "Opts you out to get DMed when Jailbreaks.app is signed/unsigned." }, { name: `**${db.get(`prefix-${message.guild.id}`)}changelog**`, value: "Gets the changelog for this version of SignedBot." }, { name: `**${db.get(`prefix-${message.guild.id}`)}support**`, value: "Gets the invite for this bot's support server." }, { name: `**${db.get(`prefix-${message.guild.id}`)}reportbug**`, value: "Reports a bug to the bot's developers." }, { name: `**${db.get(`prefix-${message.guild.id}`)}suggest**`, value: "Submits a suggestion to this bot's developers." })
            .setColor("#00b300")
        message.inlineReply(embed);
    }
}
