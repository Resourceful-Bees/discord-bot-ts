"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const commands_1 = require("../utils/commands");
exports.default = {
    id: "wiki",
    execute(command) {
        const category = command.options.getString("category", false);
        let message = !category ? undefined : (0, index_1.getCommands)().get(commands_1.CommandType.WIKI, category);
        if (!message)
            message = "https://wiki.resourcefulbees.com";
        command.reply({
            content: message,
            ephemeral: command.options.getBoolean("silent") === true
        });
    },
    complete(command) {
        const focusedValue = command.options.getFocused();
        const commands = (0, index_1.getCommands)().getCommands(commands_1.CommandType.WIKI);
        if (!commands)
            return;
        const filtered = Array.from(commands).filter(choice => choice.startsWith(focusedValue));
        command.respond(filtered.map(choice => ({ name: choice, value: choice })));
    }
};
//# sourceMappingURL=wiki.js.map