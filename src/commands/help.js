const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "eval",
    description: "Help Command",
    execute(client, message, config) {
        if (!config.devs.includes(message.author.id)) return;
        let args = message.content.split(/\s+/);
        args.shift()
        try{
        console.log(eval(args.join(' ')));} catch(e) {
            console.log(e)
        }
    }
}
