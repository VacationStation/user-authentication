/**
 * Created by christiankalig on 15.05.17.
 */

import {createConnection, Connection} from "typeorm";

import {User} from './models/User';

export class MySQL {

    constructor() {
        this.init();
    }

    public init() {
        createConnection({
            driver: {
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "ua",
                password: "zdcCeXu92jxpNUm4",
                database: "user-authentication"
            },
            entities: [
                User
            ],
            autoSchemaSync: true,
        }).then(() => {
            console.log("\x1b[32m%s\x1b[0m","MySQL connection successful");
        }).catch(err => {
            console.error("\x1b[31m%s\x1b[0m", "MySQL connection not possible");
            process.exit();
        });
    }
}