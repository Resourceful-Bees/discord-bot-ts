import { Client, ChannelType } from "discord.js";
import {DiscordEvent} from "../utils/types";

export default {
    name: "ready",
    once: true,
    execute(client: Client) {
        console.log(`Activating auto-publish of announcement channels!`);

        client.on('message', (message) => {
            if (message.channel.type === ChannelType.GuildAnnouncement && message.author.bot) {
                message.crosspost()
            }
        })
    }
} as DiscordEvent;