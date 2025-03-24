import express from 'express'
import flightController from '../controller/flight.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { ticketSchema } from '../schema/flight.schema';

const router = express.Router();

router.post('/add-ticket',validateRequest(ticketSchema), flightController.add);

export default router;