"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mysql_1 = __importDefault(require("mysql"));
class Database {
    connection;
    constructor(config) {
        this.connection = mysql_1.default.createConnection(config);
    }
    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, results) => {
                if (err)
                    return reject(err);
                resolve(results);
            });
        });
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
    getConnection() {
        return this.connection;
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map