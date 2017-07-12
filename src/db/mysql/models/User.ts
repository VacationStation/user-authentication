/**
 * Created by christiankalig on 15.05.17.
 */

import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

/**
 * User Entity for persisting a user
 */
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("string")
    firstName: string;

    @Column("string")
    lastName: string;

    @Column("string")
    email: string;

    @Column("string")
    password: string;

    @Column({
        type: "boolean",
        default: 1
    })
    isActive: boolean;

    @Column({
        type: "boolean",
        default: 0
    })
    isAdmin: boolean;

    @Column("string")
    meta: string;

    @CreateDateColumn("datetime")
    createdAt;

    @UpdateDateColumn("datetime")
    updatedAt;

}