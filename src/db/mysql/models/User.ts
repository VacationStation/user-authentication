/**
 * Created by christiankalig on 15.05.17.
 */

import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

    @Column({
        type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true
    })
    id: number;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @Column(DataType.STRING)
    email: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.BOOLEAN)
    isActive: boolean;

    @Column(DataType.BOOLEAN)
    isAdmin: boolean;

    @Column
    get fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }

}