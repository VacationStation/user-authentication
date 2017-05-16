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
        });
    }
}