"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
const commands_1 = require("../utils/commands");
exports.default = {
    id: "commands",
    execute(command) {
        if (!command.member.permissions.has(discord_js_1.PermissionFlagsBits.Administrator)) {
            command.reply({ content: "You don't have perms.", ephemeral: true });
            return;
        }
        const operation = command.options.getString("operation", true);
        const category = command.options.getString("category", true);
        const key = command.options.getString("command", true);
        const value = command.options.getString("data", false);
        const categoryEnum = category === "wiki" ? commands_1.CommandType.WIKI : category === "help" ? commands_1.CommandType.HELP : null;
        if (categoryEnum) {
            if (operation === "remove") {
                command.reply({ content: "Command successfully deleted!", ephemeral: true });
                (0, index_1.getCommands)().remove(categoryEnum, key);
            }
            else if (operation === "add") {
                if (value) {
                    command.reply({ content: "Command successfully added!", ephemeral: true });
                    (0, index_1.getCommands)().add(categoryEnum, key, value);
                }
                else {
                    command.reply({ content: "Command failed because data was not provided!", ephemeral: true });
                }
            }
            else {
                command.reply({ content: "Command operation unknown.", ephemeral: true });
            }
        }
        else {
            command.reply({ content: "Command category unknown.", ephemeral: true });
        }
    }
};
//# sourceMappingURL=commands.js.map