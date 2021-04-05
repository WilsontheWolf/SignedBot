const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Invite Command",
    execute(client, message, config) {
        if (!config.botInvite) return;
        let embed = new Discord.MessageEmbed()
            .setAuthor("SignedBot Invite Link", "https://jailbreaks.app/img/Jailbreaks.png")
            .setURL(config.botInvite)
            .setTitle("Invite Me")
            .setColor("#00b300")
            .setFooter("v" + config.version + " | Made by Monotrix & iCraze", "https://monotrix.xyz/assets/images/logo.png")
        message.inlineReply(embed);
    }
}
