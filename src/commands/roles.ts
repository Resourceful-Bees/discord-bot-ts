import {MessageActionRowComponentBuilder} from "@discordjs/builders";
import {roleSelections} from "../../configs/roles.config.json";
import {Command, RoleSelection} from "../utils/types";
import {ActionRowBuilder, ChatInputCommandInteraction, SelectMenuBuilder, SelectMenuOptionBuilder,} from "discord.js";

export default {
    id: "roles",
    execute(command: ChatInputCommandInteraction<"cached">) {
        if (!command.inGuild()) return;

        const selectionBox = new SelectMenuBuilder();
        selectionBox.setCustomId("roles_selection");
        selectionBox.setMinValues(0);
        selectionBox.setPlaceholder("Select or unselect roles to remove or add them.");

        const cache = command.member.roles.cache;

        let options: SelectMenuOptionBuilder[] = []

        for (let [id, selection] of Object.entries(roleSelections)) {
            const roleSelection: RoleSelection = <RoleSelection>selection;
            const option = new SelectMenuOptionBuilder();
            option.setLabel(roleSelection.name);
            option.setValue(id);
            option.setDefault(cache.has(id));
            if (roleSelection.description) option.setDescription(roleSelection.description);
            if (roleSelection.emoji) option.setEmoji(roleSelection.emoji);
            options.push(option);
        }

        if (options.length === 0) {
            command.reply({
                content: "Error: no selectable roles available.",
                ephemeral: true
            });
            return;
        }

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
            .addComponents([selectionBox.addOptions(options)]);

        command.reply({
            content: "Select or deselect roles below.",
            components: [row],
            ephemeral: true
        })
    }
} as Command;