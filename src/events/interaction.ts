import { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, Interaction, PermissionFlagsBits, SelectMenuInteraction } from "discord.js";
import { DiscordEvent } from "../utils/types";
import { getInteractions } from "../index";

export default {
    name: "interactionCreate",
    execute(interaction: Interaction) {
        if (interaction.isChatInputCommand()){
            const command = getInteractions().getCommand(interaction.commandName);
            if (!command) return;
            command.execute(interaction as ChatInputCommandInteraction<'cached'>);
        }
        if (interaction.isSelectMenu()) {
            const menu = getInteractions().getMenu(interaction.customId)
            if (!menu) return;
            menu.execute(interaction as SelectMenuInteraction<'cached'>);
        }
        if (interaction.isButton()) {
            const button = getInteractions().getButton(interaction.customId)
            if (!button) return;
            button.execute(interaction as ButtonInteraction<'cached'>);
        }
        if (interaction.isAutocomplete()) {
            const autoComplete = getInteractions().getAutoCompleteCommand(interaction.commandName)
            if (!autoComplete) return;
            autoComplete.complete(interaction as AutocompleteInteraction<'cached'>)
        }
    }
} as DiscordEvent;