/**
 * Created by christiankalig on 22.05.17.
 */

import {Request} from 'express';
import {User} from '../db/mysql/models/User';
import {getConnectionManager} from "typeorm";

import * as JWT from 'jsonwebtoken';

export class AuthenticationController {

    /**
     * gets the database connection
     * @returns {Connection}
     */
    private static repo() {
        return getConnectionManager().get();
    }

    public static validate(req: Request) {
        const token = req.body.token;
        console.log(token);
        const userRepo = this.repo().getRepository(User);
        return new Promise((resolve, reject) => {
            this.verifyToken(token).then(userId => {
                userRepo.findOneById(userId).then(user => {
                    if (!user) reject(new Error("No User found"));
                    resolve({user: user, token: token});
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        });
    }

    public static login(req: Request) {
        return new Promise((resolve, reject) => {
            const email = req.body.email;
            const password = req.body.password;
            const userRepo = this.repo().getRepository(User);
            userRepo
                .createQueryBuilder('user')
                .select(['user.email', 'user.firstName', 'user.lastName', 'user.isAdmin', 'user.id'])
                .where('user.email = :email')
                .andWhere('user.password = :password')
                .setMaxResults(1)
                .setParameters({email: email, password: password})
                .execute()
                .then(user => {
                    console.log("inside login: user", user);
                    if (!user || user.length === 0) reject(new Error("No User found"));
                    resolve({user: user[0], token: this.generateToken(user[0].id)});
                }).catch(err => {
                    reject(err);
                });
        });
    }

    private static verifyToken(token) {
        return new Promise((resolve, reject) => {
            const tokenData = JWT.verify(token, "test_secret");
            console.log(tokenData);
            if (tokenData.userId && tokenData.userId > 0) resolve(tokenData.userId);
            reject(new Error("Token invalid"));
        });
    }

    private static generateToken(userId) {
        console.log("generate token", userId);
        return JWT.sign({userId: userId}, "test_secret");
    }

}