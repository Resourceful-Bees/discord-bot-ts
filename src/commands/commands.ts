import {Command} from "../utils/types";
import {ChatInputCommandInteraction, PermissionFlagsBits} from "discord.js";
import {getCommands} from "../index";
import {CommandType} from "../utils/commands";

export default {
    id: "command",
    execute(command: ChatInputCommandInteraction<"cached">): void {
        if (!command.member.permissions.has(PermissionFlagsBits.Administrator)){
            command.reply({content: "You don't have perms.", ephemeral: true});
            return;
        }

        const operation = command.options.getString("operation", true)
        const category = command.options.getString("category", true)
        const key = command.options.getString("command", true)
        const value = command.options.getString("data", false)

        const categoryEnum = category === "wiki" ? CommandType.WIKI : category === "help" ? CommandType.HELP : null;

        if (categoryEnum) {
            if (operation === "remove") {
                command.reply({content: "Command successfully deleted!", ephemeral: true})
                getCommands().remove(categoryEnum, key)
            } else if (operation === "add") {
                if (value) {
                    command.reply({content: "Command successfully added!", ephemeral: true})
                    getCommands().add(categoryEnum, key, value!!);
                } else {
                    command.reply({content: "Command failed because data was not provided!", ephemeral: true})
                }
            } else {
                command.reply({content: "Command operation unknown.", ephemeral: true})
            }
        } else {
            command.reply({content: "Command category unknown.", ephemeral: true})
        }
    }
} as Command;