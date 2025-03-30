import express from 'express';
import placeControllers from '../controller/place.controllers';
import middleware from '../middleware/jwt.middleware';
import { validateRequest } from '../middleware/validate.middleware';
import { placeSchema } from '../schema/place.schema';

const router = express.Router();

router.post('/add',middleware.verifyToken, validateRequest(placeSchema), placeControllers.add);
router.put('/edit/:id',middleware.verifyToken, placeControllers.edit);
router.delete('/remove/:id',middleware.verifyToken, placeControllers.remove);
router.get('/get', middleware.verifyToken, placeControllers.get);


export default router;