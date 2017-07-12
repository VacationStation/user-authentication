/**
 * Created by christiankalig on 22.05.17.
 */

import {Router, Request, Response, NextFunction} from 'express';

import {AuthenticationController} from '../controller/authentication';

export class AuthenticationRouter {

    router: Router;

    constructor(){
        this.router = Router();
        this.init();
    }

    /**
     * validates a JWT and returns the user
     * @param req
     * @param res
     * @param next
     */
    private validate(req: Request, res: Response, next: NextFunction) {
        AuthenticationController.validate(req).then(user => {
            if (!user) return res.status(404).json({success: false});
            return res.status(200).json({success: true, user: user});
        }).catch(error => {
            return res.status(400).json({success: false});
        });
    }

    /**
     * Logs a user in by given information (currently only by username/email and password) and returns the user and the JWT
     * @param req
     * @param res
     * @param next
     */
    private login(req: Request, res: Response, next: NextFunction) {
        AuthenticationController.login(req).then(user => {
            if (!user) return res.status(404).json({success: false});
            return res.status(200).json({success: true, user: user});
        }).catch(error => {
            console.log(error);
            return res.status(400).json({success: false});
        });
    }

    private init() {
        /**
         * POST
         */
        this.router.post('/validate', this.validate);
        this.router.post('/login', this.login);
    }

}

export default new AuthenticationRouter().router;