import { IHotel } from "../interface/hotel.interface";
import { catchError } from "../middleware/catch-error.middleware";
import hotelServices from "../services/hotel.services";
import returnRes from "../utils/return-response";
import { Request,Response } from "express";

class HotelController {
    add = catchError(async (req: Request, res: Response) => {
        const data = await hotelServices.add(req.body);
        returnRes(res, 201, 'Add hotel successful', data)
    })

    edit = catchError(async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = await hotelServices.edit(id, req.body); 
        returnRes(res, 200, 'Edit hotel successful', data!);
    })

    remove = catchError(async (req: Request, res: Response) => {
        const {id} = req.params;
        const data:IHotel | null = await hotelServices.remove(id);
        returnRes(res, 200, `Remove ${data!.name} - ${data!.address} successful`)
    })

    get = catchError(async (req: Request, res: Response) => {
        const {address} = req.body;
        const data = await hotelServices.get(address) ;
        returnRes(res, 200, 'Get data successful', data);
    })
}

export default new HotelController();