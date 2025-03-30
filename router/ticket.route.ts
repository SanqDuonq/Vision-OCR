import express from 'express'
import { validateRequest } from '../middleware/validate.middleware';
import { ticketSchema } from '../schema/ticket.schema';
import ticketController from '../controller/ticket.controllers';
import middleware from '../middleware/jwt.middleware';

const router = express.Router();

router.post('/add',middleware.verifyToken, validateRequest(ticketSchema), ticketController.add);
router.put('/edit/:id',middleware.verifyToken, validateRequest(ticketSchema), ticketController.edit);
router.delete('/remove/:id',middleware.verifyToken, ticketController.remove);
router.get('/get',middleware.verifyToken, ticketController.get);

export default router;