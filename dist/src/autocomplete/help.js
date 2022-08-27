"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const commands_1 = require("../utils/commands");
exports.default = {
    id: "help",
    execute(command) {
        const category = command.options.getString("category", true);
        let message = (0, index_1.getCommands)().get(commands_1.CommandType.HELP, category);
        if (!message)
            message = "Unknown category, command code needs to be updated.";
        command.reply({
            content: message,
            ephemeral: command.options.getBoolean("silent") === true
        });
    },
    complete(command) {
        const focusedValue = command.options.getFocused();
        const commands = (0, index_1.getCommands)().getCommands(commands_1.CommandType.HELP);
        if (!commands)
            return;
        const filtered = Array.from(commands).filter(choice => choice.startsWith(focusedValue));
        command.respond(filtered.map(choice => ({ name: choice, value: choice })));
    }
};
//# sourceMappingURL=help.js.map