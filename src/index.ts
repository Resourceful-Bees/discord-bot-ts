//import { token } from "../configs/config.json";
import {Client, GatewayIntentBits} from "discord.js";
import { Interactions } from "./utils/interactions";
import {Commands} from "./utils/commands";
import * as process from "process";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] });
const interactions = new Interactions(client);
const commands = new Commands();

const getCommands = () => commands;
const getInteractions = () => interactions;

if (!process.env.DISCORD_TOKEN) {
    throw new Error("DISCORD_TOKEN environment variable missing.")
}

client.login(process.env.DISCORD_TOKEN);

export { getInteractions }
export { getCommands }


process.on('uncaughtException', err => {
    console.error(err.stack);
});
