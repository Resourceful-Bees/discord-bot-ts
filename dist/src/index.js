"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommands = exports.getInteractions = void 0;
const config_json_1 = require("../configs/config.json");
const discord_js_1 = require("discord.js");
const interactions_1 = require("./utils/interactions");
const commands_1 = require("./utils/commands");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMembers] });
const interactions = new interactions_1.Interactions(client);
const commands = new commands_1.Commands();
const getCommands = () => commands;
exports.getCommands = getCommands;
const getInteractions = () => interactions;
exports.getInteractions = getInteractions;
client.login(config_json_1.token);
process.on('uncaughtException', function (err) {
    console.error(err.stack);
});
//# sourceMappingURL=index.js.map