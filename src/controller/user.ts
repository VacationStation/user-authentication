/**
 * Created by christiankalig on 12.05.17.
 */
import {User} from '../db/mysql/models/User';
import {getConnectionManager} from "typeorm";

/**
 * works as link between router and database
 * provides/persists user data
 */
export class UserController {

    /**
     * gets the database connection
     * @returns {Connection}
     */
    private static repo() {
        return getConnectionManager().get();
    }

    /**
     * adds a user
     * @param userData
     * @returns {Promise<User>}
     */
    public static add(userData): Promise<User> {
        const userRepo = this.repo().getRepository(User);
        let user = new User();
        console.log("userData", userData);
        user = userData.user;
        return userRepo.persist(user);
    }

    /**
     * updates a user
     * @param id
     * @param userData
     * @returns {any}
     */
    public static update(id, userData) {
        const userRepo = this.repo().getRepository(User);
        return userRepo.findOneById(id).then(user => {
            user.firstName = userData.firstName;
            user.lastName = userData.lastName;
            user.email = userData.email;
            return userRepo.persist(user);
        });
    }

    /**
     * returns one user
     * @param id
     * @returns {Promise<undefined|User>}
     */
    public static getById(id: string) {
        const userRepo = this.repo().getRepository(User);
        return userRepo.findOneById(id);
    }

    /**
     * loads all users
     * @returns {Promise<User[]>}
     */
    public static getAll() {
        const userRepo = this.repo().getRepository(User);
        return userRepo
            .createQueryBuilder('user')
            .getMany();
    }

    /**
     * loads all active users
     * @returns {Promise<User[]>}
     */
    public static getAllActive() {
        const userRepo = this.repo().getRepository(User);
        return userRepo
            .createQueryBuilder('user')
            .where('user.isActive = true')
            .getMany();
    }

    /**
     * loads all inactive users
     * @returns {Promise<User[]>}
     */
    public static getAllInactive() {
        const userRepo = this.repo().getRepository(User);
        return userRepo
            .createQueryBuilder('user')
            .where('user.isActive = 0')
            .getMany();
    }
}