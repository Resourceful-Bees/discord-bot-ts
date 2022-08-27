"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const support_config_json_1 = require("../../configs/support.config.json");
exports.default = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
        if (support_config_json_1.channel && support_config_json_1.message) {
            client.channels.fetch(support_config_json_1.channel).then(c => {
                if (!(c instanceof discord_js_1.TextChannel))
                    return;
                c.messages.fetch(support_config_json_1.message).then(msg => {
                    const selectionBox = new discord_js_1.SelectMenuBuilder();
                    selectionBox.setPlaceholder("Select a support channel.");
                    selectionBox.setCustomId("support");
                    selectionBox.setMaxValues(1);
                    selectionBox.setMinValues(1);
                    let options = [];
                    for (const message of Object.keys(support_config_json_1.messages)) {
                        options.push({
                            // @ts-ignore
                            label: support_config_json_1.messages[message].label,
                            value: `message_${message}`
                        });
                    }
                    for (let thread of Object.keys(support_config_json_1.threads)) {
                        options.push({
                            // @ts-ignore
                            label: support_config_json_1.threads[thread],
                            value: thread
                        });
                    }
                    const row = new discord_js_1.ActionRowBuilder()
                        .addComponents([selectionBox.addOptions(options)]);
                    msg.edit({
                        embeds: [
                            {
                                title: "Support Channels",
                                description: "Click the selection menu below to select which support channel you may need.",
                                fields: [
                                    {
                                        name: "Info",
                                        value: "If a category has (Dev) next to it that means its for the creation of that thing or about the use of that in development process not general user use."
                                    }
                                ]
                            }
                        ],
                        components: [row]
                    });
                });
            });
        }
    }
};
//# sourceMappingURL=ready.js.map