import {AutocompleteInteraction, ChatInputCommandInteraction} from "discord.js";
import {AutoCompleteCommand} from "../utils/types";
import {getCommands} from "../index";
import {CommandType} from "../utils/commands";

export default {
    id: "wiki",
    execute(command: ChatInputCommandInteraction<"cached">) {
        const category = command.options.getString("category", false);
        let message = !category ? undefined : getCommands().get(CommandType.WIKI, category)
        if (!message) message = "https://wiki.resourcefulbees.com";

        command.reply({
            content: message,
            ephemeral: command.options.getBoolean("silent") === true
        })
    },
    complete(command: AutocompleteInteraction<"cached">) {
        const focusedValue = command.options.getFocused();
        const commands = getCommands().getCommands(CommandType.WIKI);
        if (!commands) return;
        const filtered = Array.from(commands).filter(choice => choice.startsWith(focusedValue));
        command.respond(filtered.map(choice => ({ name: choice, value: choice })));
    }
} as AutoCompleteCommand;