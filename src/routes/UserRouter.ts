/**
 * Created by christiankalig on 11.05.17.
 */
import {Router, Request, Response, NextFunction} from 'express';

import {UserController} from '../controller/user';

const Users = require('../data/users');

namespace userRoutes {}

export class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public add(req: Request, res: Response, next: NextFunction){
        const uc = new UserController(req.body.client);
        uc.add(req.body.user).then((user) => {
            res.status(200)
                .send({
                    message: 'success',
                    status: res.status
                });
        }).catch((err) => {
            res.status(500)
                .send({
                    message: 'error',
                    status: res.status
                });
        });
    }

    public getAll(req: Request, res: Response, next: NextFunction){
        res.send(Users);
    }

    public getOne(req: Request, res: Response, next: NextFunction){
        const query: Number = +req.params.id;
        let user = Users.find(myUser => myUser.id === query);
        if(user){
            res.status(200)
                .send({
                    message: 'success',
                    status: res.status,
                    user
                });
        } else {
            res.status(404)
                .send({
                    message: 'No user found with the given id.',
                    status: res.status
                });
        }
    }



    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.add);
    }
}

const userRoutes = new UserRouter();

export default userRoutes.router;