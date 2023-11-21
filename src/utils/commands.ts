import { Collection } from "discord.js";
import { Database } from "./database";
import { env } from "node:process";
import { ConnectionConfig } from "mysql";


const DB_CONFIG: ConnectionConfig = {
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT as string),
    user: env.DB_USER
};

export class Commands {
    private readonly database: Database;

    private commands: Collection<string, Collection<string, string>>;

    constructor() {
        console.log(DB_CONFIG);
        this.database = new Database(DB_CONFIG);
        this.commands = new Collection<string, Collection<string, string>>(Object.values(CommandType).map(type => [type, new Collection<string, string>()]));

        this.database.connect()
            .then(() => {
                console.log("connected to database!")
                for (let type of Object.values(CommandType)) {
                    this.database.query("SELECT `category`, `key`, `value` FROM `commands` WHERE `category` = ?", [type])
                        .then(async results => {
                            const category = this.commands.get(type);
                            if (category) {
                                for (let result of results) {
                                    category.set(result.key, result.value);
                                }
                            }
                        })
                        .catch(error => {
                            console.error("Failed to retrieve command from database: ", error)
                        })
                }
            })
            .catch(err => {
                console.error("Could not connect to command database: ", err)
            })
    }

    remove(category: CommandType, id: string) {
        this.database.query("DELETE FROM `commands` WHERE `category` = ? AND `key` = ?", [ category, id ])
            .then(() => {
                this.commands.get(category)?.delete(id)
            })
            .catch(err => {
                console.error('failed to remove command in database', err);
            });
    }

    add(category: CommandType, id: string, value: string) {
        this.database.query("INSERT IGNORE INTO `commands` (`category`, `key`, `value`) VALUES (?)", [[ category, id, value ]])
            .then(results => {
                this.commands.get(category)?.set(id, value);
            })
            .catch(err => {
                console.error('failed to set command in database', err);
            });
    }

    get(category: CommandType, id: string): string | undefined {
        return this.commands.get(category)?.get(id);
    }

    getCommands(category: CommandType): IterableIterator<string> | undefined {
        return this.commands.get(category)?.keys();
    }

    has(category: CommandType, id: string): boolean {
        return this.commands.get(category)?.has(id) || false;
    }
}

export enum CommandType {
    HELP = "help",
    WIKI = "wiki",
}