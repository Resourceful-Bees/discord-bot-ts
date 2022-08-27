import {AutocompleteInteraction, ChatInputCommandInteraction} from "discord.js";
import {AutoCompleteCommand} from "../utils/types";
import {getCommands} from "../index";
import {CommandType} from "../utils/commands";

export default {
    id: "help",
    execute(command: ChatInputCommandInteraction<"cached">) {
        const category = command.options.getString("category", true);
        let message = getCommands().get(CommandType.HELP, category)
        if (!message) message = "Unknown category, command code needs to be updated.";

        command.reply({
            content: message,
            ephemeral: command.options.getBoolean("silent") === true
        })
    },
    complete(command: AutocompleteInteraction<"cached">) {
        const focusedValue = command.options.getFocused();
        const commands = getCommands().getCommands(CommandType.HELP);
        if (!commands) return;
        const filtered = Array.from(commands).filter(choice => choice.startsWith(focusedValue));
        command.respond(filtered.map(choice => ({ name: choice, value: choice })));
    }
} as AutoCompleteCommand;