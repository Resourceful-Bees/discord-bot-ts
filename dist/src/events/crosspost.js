"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: "messageCreate",
    execute(message) {
        if (message.channel.type === discord_js_1.ChannelType.GuildAnnouncement && message.author.bot) {
            message.crosspost();
        }
    }
};
//# sourceMappingURL=crosspost.js.map