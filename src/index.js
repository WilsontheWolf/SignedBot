/*
 * SignedBot
 * Created by Monotrix and iCraze
*/

const { fetch, config, db, fs, path, exec, client, commands, update } = require("./util/Foundation")

if (!config.token) return console.error(`[${config.logname}] You did not provide a token to log in with!`)
if (!config.logchannel) return console.error(`[${config.logname}] You did not provide a guild and channel to log to!`)

client.once("ready", () => {
    client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("Bot is online at " + new Date().toUTCString() + ". (EST: " + new Date().toLocaleTimeString() + ")\nServing " + client.guilds.cache.size + " servers.")
    console.log(`[${config.logname}] Logging in as ${client.user.tag} at ${new Date().toLocaleTimeString()}\n[${config.logname}] Prefix: ${config.globalPrefix}`);
    console.log(`[${config.logname}] Serving ${client.guilds.cache.size} servers.`);
    update();
    setInterval(update, 300000);
});

client.on("message", (message) => {
    if (message.author.bot) return;
    if (!db.get(`prefix-${message.guild.id}`)) db.set(`prefix-${message.guild.id}`, config.globalPrefix);
    if (message.content.startsWith(db.get(`prefix-${message.guild.id}`)) || message.content.startsWith("<@" + client.user.id + ">") || message.content.startsWith("<@!" + client.user.id + ">")) {
        let msgFiltered = message.content.toLowerCase().replace(db.get(`prefix-${message.guild.id}`), "").replace("<@" + client.user.id + "> ", "").replace("<@" + client.user.id + ">", "").replace("<@!" + client.user.id + "> ", "").replace("<@!" + client.user.id + ">", "");
        let mentionFiltered = message.content.replace("<@" + client.user.id + "> ", "").replace("<@" + client.user.id + ">", "").replace("<@!" + client.user.id + "> ", "").replace("<@!" + client.user.id + ">", "");
        let command = commands.get(msgFiltered.split(" ")[0]);
        if(command) {
            try{ 
                command.execute(client, message, config, msgFiltered);
            } catch (e) {
                console.log('Error Running command', command.name, e);
                client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("ERROR with ``" + command.name + "``\n```" + e + "```")
                message.inlineReply('An error occurred running that command!');
            }
        }
        switch (mentionFiltered.split(" ")[0]) {
        case "":
            message.inlineReply(`Hi! I'm SignedBot.\nMy prefix on this guild is \`\`${db.get(`prefix-${message.guild.id}`)}\`\`\nYou can also ask me for help by mentioning me, like this: \`\`@SignedBot help\`\``)
            break;
        case " ":
            message.inlineReply(`Hi! I'm SignedBot.\nMy prefix on this guild is \`\`${db.get(`prefix-${message.guild.id}`)}\`\`\nYou can also ask me for help by mentioning me, like this: \`\`@SignedBot help\`\``)
            break;
        }
    } else {
        return;
    }
});

client.login(config.token);
