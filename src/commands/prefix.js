const db = require("quick.db");

module.exports = {
    name: "prefix",
    description: "Prefix Command",
    execute(client, message, config, msgFiltered) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            let newPrefix = msgFiltered.replace("prefix", "").replace(" ", "");
            if (!newPrefix) return message.inlineReply(`You need to specify what the new prefix should be.\nCurrent prefix: \`\`${db.get(`prefix-${message.guild.id}`)}\`\``);
            db.set(`prefix-${message.guild.id}`, newPrefix);
            message.inlineReply(`This guild's prefix has been changed to: \`\`${newPrefix}\`\``);
        } else message.inlineReply("You must have `ADMINISTRATOR` permissions to execute this command.");
    }
}
