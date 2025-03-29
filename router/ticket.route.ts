import express from 'express'
import { validateRequest } from '../middleware/validate.middleware';
import { ticketSchema } from '../schema/ticket.schema';
import ticketController from '../controller/ticket.controllers';

const router = express.Router();

router.post('/add',validateRequest(ticketSchema), ticketController.add);

export default router;