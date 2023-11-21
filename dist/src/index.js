"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommands = exports.getInteractions = void 0;
//import { token } from "../configs/config.json";
const discord_js_1 = require("discord.js");
const interactions_1 = require("./utils/interactions");
const commands_1 = require("./utils/commands");
const process = __importStar(require("process"));
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMembers, discord_js_1.GatewayIntentBits.GuildMessages] });
const interactions = new interactions_1.Interactions(client);
const commands = new commands_1.Commands();
const getCommands = () => commands;
exports.getCommands = getCommands;
const getInteractions = () => interactions;
exports.getInteractions = getInteractions;
if (!process.env.DISCORD_TOKEN) {
    console.log(process.env.DISCORD_TOKEN);
    throw new Error("DISCORD_TOKEN environment variable missing.");
}
client.login(process.env.DISCORD_TOKEN);
/*
process.on('uncaughtException', err => {
    console.error(err.stack);
});*/
//# sourceMappingURL=index.js.map