/**
 * Created by christiankalig on 12.05.17.
 */
import { Document } from "mongoose";
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {
    //custom methods for your model would be defined here
}