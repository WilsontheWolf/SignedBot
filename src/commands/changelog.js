const Discord = require("discord.js");

module.exports = {
    name: "changelog",
    description: "Changelog Command",
    execute(client, message, config) {
        let embed = new Discord.MessageEmbed()
            .setAuthor("SignedBot Changelog for version " + config.version, "https://jailbreaks.app/img/Jailbreaks.png")
            .setURL("https://jailbreaks.app")
            .setFooter("v" + config.version + " | Made by Monotrix & iCraze", "https://monotrix.xyz/assets/images/logo.png")
            .addFields({name: "Changelog", value: config.changelog})
            .setColor("#00b300");
        message.inlineReply(embed);
    }
}
