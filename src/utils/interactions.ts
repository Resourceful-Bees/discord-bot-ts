import { readdir } from 'fs/promises';
import {Client, ClientEvents, Collection} from "discord.js";
import {Command, AutoCompleteCommand, Button, Menu, DiscordEvent} from "./types";

export class Interactions {
    private readonly commands: Collection<string, Command>;
    private readonly autoCompleteCommands: Collection<string, AutoCompleteCommand>;
    private readonly buttons: Collection<string, Button>;
    private readonly menus: Collection<string, Menu>;

    constructor(client: Client) {
        let commands = new Collection<string, Command>();
        let autoCompleteCommands = new Collection<string, AutoCompleteCommand>();
        let buttons = new Collection<string, Button>();
        let menus = new Collection<string, Menu>();

        readdir("./dist/src/events")
            .then(r => r.filter(file => file.endsWith(".js")))
            .then(files => files.forEach(async file => {
                const event: DiscordEvent = (await import(`../events/${file}`)).default;
                console.log(`Added event listener: ${event.name}`)
                if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
                else client.on(event.name, (...args) => event.execute(...args, client))
            }))

        readdir("./dist/src/commands")
            .then(r => r.filter(file => file.endsWith(".js")))
            .then(files => files.forEach(async file => {
                const command: Command = (await import(`../commands/${file}`)).default;
                if (command.id) commands.set(command.id, command);
            }))

        readdir("./dist/src/autocomplete")
            .then(r => r.filter(file => file.endsWith(".js")))
            .then(files => files.forEach(async file => {
                const command: AutoCompleteCommand = (await import(`../autocomplete/${file}`)).default;
                if (command.id) {
                    autoCompleteCommands.set(command.id, command);
                    commands.set(command.id, command)
                }
            }))

        readdir("./dist/src/buttons")
            .then(r => r.filter(file => file.endsWith(".js")))
            .then(files => files.forEach(async file => {
                const button: Button = (await import(`../buttons/${file}`)).default;
                if (button.id) buttons.set(button.id, button);
            }))

        readdir("./dist/src/menus")
            .then(r => r.filter(file => file.endsWith(".js")))
            .then(files => files.forEach(async file => {
                const menu: Menu = (await import(`../menus/${file}`)).default;
                if (menu.id) menus.set(menu.id, menu);
            }))

        this.commands = commands;
        this.autoCompleteCommands = autoCompleteCommands;
        this.buttons = buttons;
        this.menus = menus;
    }

    getCommand(command: string): (Command | undefined) {
        return this.commands.get(command);
    }

    getAutoCompleteCommand(command: string): (AutoCompleteCommand | undefined) {
        return this.autoCompleteCommands.get(command);
    }

    getButton(button: string): (Button | undefined) {
        return this.buttons.get(button);
    }

    getMenu(menu: string): (Menu | undefined) {
        return this.menus.get(menu);
    }
}