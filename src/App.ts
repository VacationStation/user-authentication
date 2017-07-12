/**
 * Created by christiankalig on 11.05.17.
 */

import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {MySQL} from './db/mysql';
import 'reflect-metadata';

import UserRouter from './routes/UserRouter';
import AuthenticationRouter from './routes/AuthenticationRouter';

class App {

    public express: express.Application;
    private db;

    constructor() {
        this.express = express();
        this.db = new MySQL();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'User-Authentication API version 1'
            });
        });
        this.express.use('/api/v1', router);
        // TODO: secure routes
        this.express.use('/api/v1/users', UserRouter);
        this.express.use('/api/v1/auth', AuthenticationRouter);
    }

}

export default new App().express;