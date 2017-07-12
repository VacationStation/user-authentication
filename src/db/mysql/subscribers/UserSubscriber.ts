/**
 * Created by christiankalig on 23.05.17.
 */

import {EventSubscriber, EntitySubscriberInterface, InsertEvent} from "typeorm";

import {User} from '../models/User';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    beforeInsert(event: InsertEvent<User>) {
        console.log(`BEFORE User INSERTED: `, event.entity);
    }

    beforeUpdate(event: InsertEvent<User>) {
        console.log('BEFORE User UPDATED: ', event.entity);
    }

}