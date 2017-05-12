/**
 * Created by christiankalig on 12.05.17.
 */

import mongoose = require("mongoose");
import Promise = require('promise');

import {IUser} from '../interfaces/user';

import {IModel} from '../models/model';
import {IUserModel} from '../models/user';

import {userSchema} from '../schemes/user';

import {MongoDBController} from './mongodb';

export class UserController {

    private model:IModel;
    private db: MongoDBController;

    constructor(client: string){
        this.db = new MongoDBController(client);
        this.model = {user: this.db.connection.model<IUserModel>("User", userSchema)};
    }

    public add(userData:IModel){
        const user = new this.model.user(userData);
        return new Promise((resolve, reject) => {
            user.save((err, user) => {
                if(err) reject(err);
                if(user) resolve(user);
            });
        });
    }
}