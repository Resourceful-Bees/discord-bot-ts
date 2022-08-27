import {ChatInputCommandInteraction, PermissionFlagsBits} from "discord.js";
import {Command} from "../utils/types";

export default {
    id: "paste",
    execute(command: ChatInputCommandInteraction<"cached">): void {
        const file = command.options.getAttachment("file", true);
    }
} as Command;