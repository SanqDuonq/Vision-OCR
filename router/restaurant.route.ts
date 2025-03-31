import express from 'express';
import middleware from '../middleware/jwt.middleware';
import { validateRequest } from '../middleware/validate.middleware';
import { restaurantSchema } from '../schema/restaurant.schema';
import restaurantControllers from '../controller/restaurant.controllers';

const router = express.Router();

router.post('/add',middleware.verifyToken, validateRequest(restaurantSchema), restaurantControllers.add);
router.put('/edit/:id',middleware.verifyToken, restaurantControllers.edit);
router.delete('/remove/:id',middleware.verifyToken, restaurantControllers.remove);
router.get('/get', middleware.verifyToken, restaurantControllers.get);


export default router;