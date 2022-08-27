import {ActionRowBuilder, Client, SelectMenuBuilder, TextChannel} from "discord.js";
import { DiscordEvent } from "../utils/types";
import {MessageActionRowComponentBuilder} from "@discordjs/builders";

import { message, channel, threads, messages } from "../../configs/support.config.json";

export default {
    name: "ready",
    once: true,
    execute(client: Client) {
        console.log(`Ready! Logged in as ${client.user?.tag}`);

        if (channel && message) {
            client.channels.fetch(channel).then(c => {
                if (!(c instanceof TextChannel)) return;

                c.messages.fetch(message).then(msg => {
                    const selectionBox = new SelectMenuBuilder();
                    selectionBox.setPlaceholder("Select a support channel.");
                    selectionBox.setCustomId("support");
                    selectionBox.setMaxValues(1);
                    selectionBox.setMinValues(1);

                    let options = [];
                    for (const message of Object.keys(messages)) {
                        options.push({
                            // @ts-ignore
                            label: messages[message].label,
                            value: `message_${message}`
                        });
                    }

                    for (let thread of Object.keys(threads)) {
                        options.push({
                            // @ts-ignore
                            label: threads[thread],
                            value: thread
                        });
                    }

                    const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
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
} as DiscordEvent;