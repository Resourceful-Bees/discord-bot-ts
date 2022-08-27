"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_config_json_1 = require("../../configs/roles.config.json");
const discord_js_1 = require("discord.js");
exports.default = {
    id: "roles",
    execute(command) {
        if (!command.inGuild())
            return;
        const selectionBox = new discord_js_1.SelectMenuBuilder();
        selectionBox.setCustomId("roles_selection");
        selectionBox.setMinValues(0);
        selectionBox.setPlaceholder("Select or unselect roles to remove or add them.");
        const cache = command.member.roles.cache;
        let options = [];
        for (let [id, selection] of Object.entries(roles_config_json_1.roleSelections)) {
            const roleSelection = selection;
            const option = new discord_js_1.SelectMenuOptionBuilder();
            option.setLabel(roleSelection.name);
            option.setValue(id);
            option.setDefault(cache.has(id));
            if (roleSelection.description)
                option.setDescription(roleSelection.description);
            if (roleSelection.emoji)
                option.setEmoji(roleSelection.emoji);
            options.push(option);
        }
        if (options.length === 0) {
            command.reply({
                content: "Error: no selectable roles available.",
                ephemeral: true
            });
            return;
        }
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents([selectionBox.addOptions(options)]);
        command.reply({
            content: "Select or deselect roles below.",
            components: [row],
            ephemeral: true
        });
    }
};
//# sourceMappingURL=roles.js.map