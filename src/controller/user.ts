/**
 * Created by christiankalig on 12.05.17.
 */
import {User} from '../db/mysql/models/User';
import {getConnectionManager} from "typeorm";

export class UserController {

    private connection;
    private userRepo;

    constructor() {
        console.log("uc constructor");
        const cm = getConnectionManager();
        this.connection = cm.get();
    }

    private static repo() {
        return getConnectionManager().get();
    }

    public static add(userData) {
        const userRepo = this.repo().getRepository(User);
        let user = new User();
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.email = userData.email;

        return userRepo.persist(user);
    }

    public static update(id, userData) {
        const userRepo = this.repo().getRepository(User);
        return userRepo.findOneById(id).then(user => {
            user.firstName = userData.firstName;
            user.lastName = userData.lastName;
            user.email = userData.email;
            return userRepo.persist(user);
        });
    }

    public static getById(id: string) {
        const userRepo = this.repo().getRepository(User);
        return userRepo.findOneById(id);
    }

    public static getAll() {
        const userRepo = this.repo().getRepository(User);
        return userRepo
            .createQueryBuilder('user')
            .getMany();
    }

    public static getAllActive() {
        const userRepo = this.repo().getRepository(User);
        return userRepo
            .createQueryBuilder('user')
            .where('user.isActive = 1')
            .getMany();
    }

    public static getAllInactive() {
        const userRepo = this.repo().getRepository(User);
        return userRepo
            .createQueryBuilder('user')
            .where('user.isActive = 0')
            .getMany();
    }
}