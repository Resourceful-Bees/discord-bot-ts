import { ChannelType, Message } from "discord.js";
import { DiscordEvent } from "../utils/types";

export default {
    name: "messageCreate",
    execute(message: Message) {
        console.log(`testing message for crosspost:`);
        console.log(`type: ${message.channel.type}`);
        console.log(`isBot: ${message.author.bot}`);
        if (message.channel.type === ChannelType.GuildAnnouncement && message.author.bot) {
            console.log("crossposting message");
            message.crosspost()
                .then(() => console.log("crossposted message!"))
                .catch(console.error);
        }
    }
} as DiscordEvent;