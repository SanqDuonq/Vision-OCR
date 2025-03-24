import express from 'express'
import authController from '../controller/auth.controller';

const router = express.Router();

router.post('/sign-in', authController.signIn);
router.post('/sign-up',authController.signUp);

export default router;