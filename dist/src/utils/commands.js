"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandType = exports.Commands = void 0;
const discord_js_1 = require("discord.js");
const database_1 = require("./database");
const config_json_1 = require("../../configs/config.json");
class Commands {
    database;
    commands;
    constructor() {
        this.database = new database_1.Database(config_json_1.databaseOptions);
        this.commands = new discord_js_1.Collection(Object.values(CommandType).map(type => [type, new discord_js_1.Collection()]));
        this.database.connect()
            .then(() => {
            for (let type of Object.values(CommandType)) {
                this.database.query("SELECT `category`, `key`, `value` FROM `commands` WHERE `category` = ?", [type])
                    .then(async (results) => {
                    const category = this.commands.get(type);
                    if (category) {
                        for (let result of results) {
                            category.set(result.key, result.value);
                        }
                    }
                })
                    .catch(error => {
                    console.error("Failed to retrieve command from database: ", error);
                });
            }
        })
            .catch(err => {
            console.error("Could not connect to command database: ", err);
        });
    }
    remove(category, id) {
        this.database.query("DELETE FROM `commands` WHERE `category` = ? AND `key` = ?", [category, id])
            .then(() => {
            this.commands.get(category)?.delete(id);
        })
            .catch(err => {
            console.error('failed to remove command in database', err);
        });
    }
    add(category, id, value) {
        this.database.query("INSERT IGNORE INTO `commands` (`category`, `key`, `value`) VALUES (?)", [[category, id, value]])
            .then(results => {
            this.commands.get(category)?.set(id, value);
        })
            .catch(err => {
            console.error('failed to set command in database', err);
        });
    }
    get(category, id) {
        return this.commands.get(category)?.get(id);
    }
    getCommands(category) {
        return this.commands.get(category)?.keys();
    }
    has(category, id) {
        return this.commands.get(category)?.has(id) || false;
    }
}
exports.Commands = Commands;
var CommandType;
(function (CommandType) {
    CommandType["HELP"] = "help";
    CommandType["WIKI"] = "wiki";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
//# sourceMappingURL=commands.js.map