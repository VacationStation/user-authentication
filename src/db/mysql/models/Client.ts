/**
 * Created by christiankalig on 18.05.17.
 */

import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("string")
    name: string;

    @Column("string")
    meta: string;

    @CreateDateColumn("datetime")
    createdAt;

    @UpdateDateColumn("datetime")
    updatedAt;

}