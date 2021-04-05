module.exports = {
    name: "reboot",
    description: "Reboot Command",
    execute(client, message, config) {
        if (!client.devs.includes(message.author.id)) return;
        message.channel.send("Rebooting...")
        process.exit()
    }
}