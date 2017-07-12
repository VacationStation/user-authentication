/**
 * Created by christiankalig on 11.05.17.
 */
import {Router, Request, Response, NextFunction} from 'express';

import {UserController} from '../controller/user';

export class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private add(req: Request, res: Response, next: NextFunction) {
        console.log("req.body", req.body);
        UserController.add(req.body).then((user) => {
            res.status(200).send({success: true, message: 'success', status: res.status, user: user});
        }).catch((err) => {
            res.status(500).send({message: 'error', status: res.status});
        });
    }

    private update(req: Request, res: Response, next: NextFunction) {
        UserController.update(req.params.id, req.body.user).then((user) => {
            res.status(200).send({message: 'success', status: res.status, user: user});
        }).catch((err) => {
            res.status(500).send({message: 'error', status: res.status});
        });
    }

    private getAll(req: Request, res: Response, next: NextFunction) {
        UserController.getAll().then((users) => {
            if (!users) res.status(404).send({message: 'error', status: res.status});
            res.status(200).json({message: 'success', status: res.status, users: users});
        }).catch((err) => {
            res.status(500).send({message: 'error', status: res.status});
        });
    }

    private getOne(req: Request, res: Response, next: NextFunction) {
        UserController.getById(req.params.id).then((user) => {
            if (!user) res.status(404).send({message: 'error', status: res.status});
            res.status(200).send({message: 'success', status: res.status, user: user});
        }).catch((err) => {
            res.status(500).send({message: 'error', status: res.status});
        });
    }

    private getAllActive(req: Request, res: Response, next: NextFunction) {
        UserController.getAllActive().then((users) => {
            if (!users) res.status(404).send({message: 'error', status: res.status});
            res.status(200).json({message: 'success', status: res.status, users: users});
        }).catch((err) => {
            res.status(500).send({message: 'error', error: err, status: res.status});
        });
    }

    private getAllInactive(req: Request, res: Response, next: NextFunction) {
        UserController.getAllInactive().then((users) => {
            if (!users) res.status(404).send({message: 'error', status: res.status});
            res.status(200).json({message: 'success', status: res.status, users: users});
        }).catch((err) => {
            res.status(500).send({message: 'error', status: res.status});
        });
    }

    init() {
        /**
         * GET
         */
        this.router.get('/inactive', this.getAllInactive); // get all inactive users
        this.router.get('/active', this.getAllActive); // get all active users
        this.router.get('/:id', this.getOne); // get one user
        this.router.get('/', this.getAll); // get all users

        /**
         * PATCH
         */
        this.router.patch('/:id', this.update); //update on user

        /**
         * POST
         */
        this.router.post('/', this.add); //add one user
    }
}

export default new UserRouter().router;