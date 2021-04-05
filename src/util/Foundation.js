const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../data/config.json");
const db = require("quick.db");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
require("./InlineReplies");
const client = new Discord.Client();

// Commands
let commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.set(command.name, command);
}

// Update status
const update = async () => {
    exec("cd ../; git add .; git commit -m \"Update Database\"; git pull; git push; cd ./src;");
    const body = await fetch("https://jailbreaks.app/status.php").then(res => res.json())
    client.user.setActivity(config.globalPrefix + `help | ${body.status == "Signed" ? "Signed" : "Revoked"}`, { type: "WATCHING" });
    client.guilds.cache.get(config.logchannel[0]).channels.cache.get(config.logchannel[1]).send("Update: Bot status changed at " + new Date().toUTCString() + ". (EST: " + new Date().toLocaleTimeString() + ")\nServing " + client.guilds.cache.size + " servers.");

    db.get("dmlist.ids").forEach(function (id) {
        if (id != "Bruh") {
            const filePath = path.join(__dirname, 'status/status.txt');
            fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
                if (!err) {
                    if (data == body) { return; } else {
                        let newValue;
                        if (body.status == "Signed") { newValue = data.replace("Revoked", "Signed"); }
                        else newValue = data.replace("Signed", "Revoked")
                        fs.writeFile(filePath, newValue, { encoding: "utf-8" }, function () { });
                    }
                    let msgToSend = "";
                    if (body.status == "Signed") msgToSend = "Jailbreaks.app is now signed!\nhttps://jailbreaks.app";
                    else msgToSend = "Jailbreaks.app has been revoked. :(";
                    client.users.cache.find(user => user.id === id).send(msgToSend);
                } else {
                    console.log(err);
                }
            });
        }
    });
}

// Ensure db values exist
if (!db.has('dmlist.ids')) 
    db.set('dmlist.ids', [])

module.exports = {
    Discord,
    fetch,
    config,
    db,
    fs,
    path,
    exec,
    client,
    commands,
    update
}