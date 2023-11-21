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
exports.Interactions = void 0;
const promises_1 = require("fs/promises");
const discord_js_1 = require("discord.js");
class Interactions {
    commands;
    autoCompleteCommands;
    buttons;
    menus;
    constructor(client) {
        let commands = new discord_js_1.Collection();
        let autoCompleteCommands = new discord_js_1.Collection();
        let buttons = new discord_js_1.Collection();
        let menus = new discord_js_1.Collection();
        (0, promises_1.readdir)("./dist/src/events")
            .then(r => r.filter(file => file.endsWith(".js")))
            .then(files => files.forEach(async (file) => {
            const event = (await Promise.resolve(`${`../events/${file}`}`).then(s => __importStar(require(s)))).default;
            console.log(`Added event listener: ${event.name}`);
            if (event.once)
                client.once(event.name, (...args) => event.execute(...args, client));
            else
                client.on(event.name, (...args) => event.execute(...args, client));
        }));
        (0, promises_1.readdir)("./dist/src/commands")
            .then(r => r.filter(file => file.endsWith(".js")))
            .then(files => files.forEach(async (file) => {
            const command = (await Promise.resolve(`${`../commands/${file}`}`).then(s => __importStar(require(s)))).default;
            if (command.id)
                commands.set(command.id, command);
        }));
        (0, promises_1.readdir)("./dist/src/autocomplete")
            .then(r => r.filter(file => file.endsWith(".js")))
            .then(files => files.forEach(async (file) => {
            const command = (await Promise.resolve(`${`../autocomplete/${file}`}`).then(s => __importStar(require(s)))).default;
            if (command.id) {
                autoCompleteCommands.set(command.id, command);
                commands.set(command.id, command);
            }
        }));
        (0, promises_1.readdir)("./dist/src/buttons")
            .then(r => r.filter(file => file.endsWith(".js")))
            .then(files => files.forEach(async (file) => {
            const button = (await Promise.resolve(`${`../buttons/${file}`}`).then(s => __importStar(require(s)))).default;
            if (button.id)
                buttons.set(button.id, button);
        }));
        (0, promises_1.readdir)("./dist/src/menus")
            .then(r => r.filter(file => file.endsWith(".js")))
            .then(files => files.forEach(async (file) => {
            const menu = (await Promise.resolve(`${`../menus/${file}`}`).then(s => __importStar(require(s)))).default;
            if (menu.id)
                menus.set(menu.id, menu);
        }));
        this.commands = commands;
        this.autoCompleteCommands = autoCompleteCommands;
        this.buttons = buttons;
        this.menus = menus;
    }
    getCommand(command) {
        return this.commands.get(command);
    }
    getAutoCompleteCommand(command) {
        return this.autoCompleteCommands.get(command);
    }
    getButton(button) {
        return this.buttons.get(button);
    }
    getMenu(menu) {
        return this.menus.get(menu);
    }
}
exports.Interactions = Interactions;
//# sourceMappingURL=interactions.js.map