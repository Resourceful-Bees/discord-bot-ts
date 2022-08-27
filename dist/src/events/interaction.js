"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
exports.default = {
    name: "interactionCreate",
    execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = (0, index_1.getInteractions)().getCommand(interaction.commandName);
            if (!command)
                return;
            command.execute(interaction);
        }
        if (interaction.isSelectMenu()) {
            const menu = (0, index_1.getInteractions)().getMenu(interaction.customId);
            if (!menu)
                return;
            menu.execute(interaction);
        }
        if (interaction.isButton()) {
            const button = (0, index_1.getInteractions)().getButton(interaction.customId);
            if (!button)
                return;
            button.execute(interaction);
        }
        if (interaction.isAutocomplete()) {
            const autoComplete = (0, index_1.getInteractions)().getAutoCompleteCommand(interaction.commandName);
            if (!autoComplete)
                return;
            autoComplete.complete(interaction);
        }
    }
};
//# sourceMappingURL=interaction.js.map