import { token } from "../configs/config.json";
import {Client, GatewayIntentBits} from "discord.js";
import { Interactions } from "./utils/interactions";
import {Commands} from "./utils/commands";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
const interactions = new Interactions(client);
const commands = new Commands();

const getCommands = () => commands;
const getInteractions = () => interactions;

client.login(token);

export { getInteractions }
export { getCommands }

process.on('uncaughtException', function (err) {
    console.error(err.stack)
});