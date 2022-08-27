import {
    AutocompleteInteraction,
    ButtonInteraction,
    ChatInputCommandInteraction,
    ClientEvents,
    CommandInteraction,
    SelectMenuInteraction
} from "discord.js";

export interface DiscordEvent {
    name: keyof ClientEvents;
    once?: boolean;
    execute(...args: any[]): any;
}

export interface Command {
    id: string;
    execute(command: ChatInputCommandInteraction<'cached'>): void;
}

export interface AutoCompleteCommand extends Command {
    complete(command: AutocompleteInteraction<'cached'>): void;
}

export interface Button {
    id: string;
    execute(button: ButtonInteraction<'cached'>): void;
}

export interface Menu {
    id: string;
    execute(menu: SelectMenuInteraction<'cached'>): void;
}

export interface RoleSelection {
    name: string;
    description?: string;
    emoji?: string;
}