/**
 * Created by christiankalig on 12.05.17.
 */
import { Model } from "mongoose";
import { IUserModel } from "./user";

export interface IModel {
    user: Model<IUserModel>;
}