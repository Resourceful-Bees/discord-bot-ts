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
exports.CommandType = exports.Commands = void 0;
const discord_js_1 = require("discord.js");
const database_1 = require("./database");
const process = __importStar(require("process"));
class Commands {
    database;
    commands;
    constructor() {
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_NAME);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_PORT);
        console.log(process.env.DB_USER);
        this.database = new database_1.Database(`{host: ${process.env.DB_HOST}, database: ${process.env.DB_NAME}, password: ${process.env.DB_PASSWORD}, port: ${process.env.DB_PORT}, user: ${process.env.DB_USER}}`);
        this.commands = new discord_js_1.Collection(Object.values(CommandType).map(type => [type, new discord_js_1.Collection()]));
        this.database.connect()
            .then(() => {
            console.log("connected to database!");
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