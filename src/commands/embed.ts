import {ChatInputCommandInteraction, PermissionFlagsBits} from "discord.js";
import {Command} from "../utils/types";

export default {
    id: "embed",
    execute(command: ChatInputCommandInteraction<"cached">): void {
        if (!command.member.permissions.has(PermissionFlagsBits.Administrator)) {
            command.reply({content: "You don't have perms.", ephemeral: true});
            return;
        }

        const message = command.options.getString("message", true);
        const channel = command.options.getChannel("channel", true);
        try {
            command.reply({content: "Message Created!", ephemeral: true})
            if (channel?.isTextBased()) {
                channel.send(JSON.parse(message.trim()))
            } else {
                command.reply({content: "Message not created due to channel not being able to have messages sent in it.", ephemeral: true})
            }
        }catch (e){
            command.reply({content: "Message not created data was bad.", ephemeral: true})
        }
    }
} as Command;