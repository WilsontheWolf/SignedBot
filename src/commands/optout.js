const db = require("quick.db");

module.exports = {
    name: "optout",
    description: "Opt Out Command",
    execute(client, message, config) {
        if (db.get("dmlist.ids").includes(message.member.id)) {
            let arr = db.get("dmlist.ids");
            let filtered = arr.filter(e => e !== message.member.id);
            db.set("dmlist.ids", filtered);
            message.inlineReply("You will no longer be DM'd when apps are revoked/resigned.");
        } else message.inlineReply("You are not already on the DM list.");
    }
}
