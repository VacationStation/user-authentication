/**
 * Created by christiankalig on 12.05.17.
 */

import {Schema} from 'mongoose';

export const userSchema: Schema = new Schema({
    createdAt: Date,
    email: String,
    firstname: String,
    lastname: String
});

userSchema.pre("save", function (next) {
    console.log(this);
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});