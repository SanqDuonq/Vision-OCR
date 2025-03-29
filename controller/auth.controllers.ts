import {NextFunction, Request, Response} from 'express'
import passport from 'passport';
import { catchError } from '../middleware/catch-error.middleware';
import authServices from '../services/auth.services';
import jwtServices from '../services/jwt.services';
import returnRes from '../utils/return-response';

class AuthController {
    signUp = catchError(async(req: Request, res: Response) => {
        const data = await authServices.signUp(req.body);
        const accessToken = jwtServices.generateJwt(res,data.id);
        returnRes(res, 201, 'Sign up successful', accessToken);
    })

    async signIn (req: Request, res: Response) {
        const {email,password} = req.body
        const data = await authServices.signIn(email,password);
        const accessToken = jwtServices.generateJwt(res,data.id);
        returnRes(res, 200, 'Sign in successful', accessToken); 
    }

    async googleAuth (req: Request, res: Response, next: NextFunction) {
        passport.authenticate('google', {scope: ['profile', 'email']})(req,res,next)
    }

    async googleCallback(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('google', { session: false }, (err, user) => {
            if (err || !user) {
                returnRes(res, 401, 'Google authentication failed')
            }
            const accessToken = jwtServices.generateJwt(res,user.id);
            returnRes(res, 200, 'Google authentication successful', {accessToken, user})
        })(req, res, next);
    }

    async githubAuth (req: Request, res: Response, next: NextFunction) {
        passport.authenticate('github', {scope: ['user:email']})(req,res,next)
    }

    async githubCallback(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('github', { session: false }, (err:any, user:any) => {
            if (err || !user) {
                returnRes(res, 401, 'Github authentication failed')
            }
            const accessToken = jwtServices.generateJwt(res,user.id);
            returnRes(res, 200, 'Github authentication successful', {accessToken, user})
        })(req, res, next);
    }
}

export default new AuthController();