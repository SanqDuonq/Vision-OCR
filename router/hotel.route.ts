import express from 'express';
import middleware from '../middleware/jwt.middleware';
import { validateRequest } from '../middleware/validate.middleware';
import { hotelSchema } from '../schema/hotel.schema';
import hotelControllers from '../controller/hotel.controllers';

const router = express.Router();

router.post('/add',middleware.verifyToken, validateRequest(hotelSchema), hotelControllers.add);
router.put('/edit/:id',middleware.verifyToken, hotelControllers.edit);
router.delete('/remove/:id',middleware.verifyToken, hotelControllers.remove);
router.get('/get', middleware.verifyToken, hotelControllers.get);

export default router;