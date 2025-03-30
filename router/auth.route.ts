import express from 'express'
import authController from '../controller/auth.controllers';
import { validateRequest } from '../middleware/validate.middleware';
import { signInSchema, signUpSchema } from '../schema/auth.schema';

const router = express.Router();

router.post('/sign-in',validateRequest(signInSchema), authController.signIn);
router.post('/sign-up',validateRequest(signUpSchema), authController.signUp);
router.post('/logout', authController.logout);

router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);



export default router;