import { IPlace } from "../interface/place.interface";
import { catchError } from "../middleware/catch-error.middleware";
import placeServices from "../services/place.services";
import returnRes from "../utils/return-response";
import { Request, Response } from "express";

class PlaceController {
    add = catchError(async (req: Request, res: Response) => {
        const data = await placeServices.add(req.body);
        returnRes(res, 201, 'Add place successful', data)
    })

    edit = catchError(async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = await placeServices.edit(id, req.body); 
        returnRes(res, 200, 'Edit place successful', data!);
    })

    remove = catchError(async (req: Request, res: Response) => {
        const {id} = req.params;
        const data:IPlace | null = await placeServices.remove(id);
        returnRes(res, 200, `Remove ${data!.name} - ${data!.address} successful`)
    })

    get = catchError(async (req: Request, res: Response) => {
        const {address} = req.body;
        const data = await placeServices.get(address) ;
        returnRes(res, 200, 'Get data successful', data);
    })
}

export default new PlaceController();