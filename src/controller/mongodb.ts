/**
 * Created by christiankalig on 12.05.17.
 */

import mongoose = require("mongoose");

import {MongoDBConfig} from '../config/mongodb';

export class MongoDBController {

    public connection: mongoose.Connection;

    constructor(client: string) {
        this.init(client);
    }

    private init(client: string) {
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
        this.connection = mongoose.createConnection(MongoDBConfig.BASE_CONNECTION_URL + client);
    }

}