import {Request, Response} from 'express'
import returnRes from '../utils/return-response';
import flightService from '../services/ticket.services';
import { catchError } from '../middleware/catch-error.middleware';

class TicketController {
    add = catchError(async (req: Request, res: Response) => {
        const data = await flightService.add(req.body,req.user!);
        returnRes(res, 201, 'Save ticket successful', data);
    })

    edit = catchError(async (req: Request, res: Response) => {
        const {id} = req.params;
        const edit = await flightService.edit(id, req.body);
        returnRes(res, 200, 'Update ticket successful', edit);
    })

    remove = catchError(async (req: Request, res: Response) => {
        const {id} = req.params;
        await flightService.remove(id);
        returnRes(res, 200, 'Remove ticket successful')
    })

    get = catchError(async (req: Request, res: Response) => {
        const userId = req.user!;
        const data = await flightService.get(userId.toString());
        returnRes(res, 200, 'Get list ticket successful', data)
    })
}

export default new TicketController();