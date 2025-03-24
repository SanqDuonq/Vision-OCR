import {NextFunction, Request, Response} from 'express'
import admin from '../utils/firebase-admin';
import passport from 'passport';

class AuthController {
    async signUp (req: Request, res: Response) {
        const {displayName, email, password} = req.body;
        try {
            const user = await admin.auth().createUser({
                email,
                password,
                displayName,
            })
            res.status(201).json({
                message: 'Create user successful',
                uid: user.uid,
                email: user.email
            })
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    async signIn (req: Request, res: Response) {
        const {idToken} = req.body;
        try {
            const decode = await admin.auth().verifyIdToken(idToken);
            res.status(200).json({
                message: 'Sign in successful',
                uid: decode.uid,
                email: decode.email
            })
        } catch (error) {
            res.status(401).json({
                message: 'Invalid token'
            })
        }
    }

    async googleAuth (req: Request, res: Response, next: NextFunction) {
        passport.authenticate('google', {scope: ['profile', 'email']})(req,res,next)
    }

    async googleCallback(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
            if (err || !user) {
                return res.redirect('/login?error=auth_failed');
            }
            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    return res.redirect('/login?error=login_failed');
                }
    
                return res.redirect('/home');
            });
        })(req, res, next);
    }

}

export default new AuthController();