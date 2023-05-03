import { ChannelType, Message } from "discord.js";
import { DiscordEvent } from "../utils/types";

export default {
    name: "messageCreate",
    execute(message: Message) {
        if (message.channel.type === ChannelType.GuildAnnouncement && message.author.bot) {
            message.crosspost()
                .then(() => console.log("crossposted message!"))
                .catch(console.error);
        }
    }
} as DiscordEvent;