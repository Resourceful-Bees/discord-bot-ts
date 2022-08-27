"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
exports.default = {
    id: "poll",
    execute(command) {
        if (!command.member.permissions.has(discord_js_1.PermissionFlagsBits.Administrator)) {
            command.reply({ content: "You don't have perms.", ephemeral: true });
            return;
        }
        const channel = command.options.getChannel("channel", true);
        const title = command.options.getString("title", true);
        const embed = new discord_js_1.EmbedBuilder();
        let desc = [];
        for (let i = 1; i <= 10; i++) {
            const option = command.options.getString("option" + i);
            if (!option)
                break;
            desc.push(emojis[i - 1] + " " + option);
        }
        embed.setTitle(title);
        embed.setDescription(desc.join("\n"));
        embed.setColor("Orange");
        if (channel instanceof discord_js_1.TextChannel) {
            channel.send({ embeds: [embed] }).then(message => {
                command.reply({ content: "Poll Created!", ephemeral: true });
                for (let i = 0; i < desc.length; i++)
                    message.react(emojis[i]);
                channel.threads.create({
                    name: "Poll Thread",
                    startMessage: message,
                    autoArchiveDuration: discord_js_1.ThreadAutoArchiveDuration.OneWeek
                });
            });
        }
        else {
            command.reply({ content: "Channel provided was not a text channel.", ephemeral: true });
        }
    }
};
//# sourceMappingURL=poll.js.map