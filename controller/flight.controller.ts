import {Request, Response} from 'express'
import returnRes from '../utils/return-response';
import flightService from '../services/flight.service';
import { catchError } from '../middleware/catch-error.middleware';
import placeService from '../services/place.service';

class FlightController {
    add = catchError(async (req: Request, res: Response) => {
        const data = await flightService.add(req.body);
        const touristPlaces = await placeService.getTouristPlace(req.body.to);
        returnRes(res, 201, 'Lưu vé thành công', { ...data.toObject(), touristPlaces });
    })
}

export default new FlightController();