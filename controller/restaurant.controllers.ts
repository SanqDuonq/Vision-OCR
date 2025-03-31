import { IRestaurant } from "../interface/restaurant.interface";
import { catchError } from "../middleware/catch-error.middleware";
import restaurantServices from "../services/restaurant.services";
import returnRes from "../utils/return-response";
import { Request,Response } from "express";

class RestaurantController {
    add = catchError(async (req: Request, res: Response) => {
        const data = await restaurantServices.add(req.body);
        returnRes(res, 201, 'Add restaurant successful', data)
    })

    edit = catchError(async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = await restaurantServices.edit(id, req.body); 
        returnRes(res, 200, 'Edit restaurant successful', data!);
    })

    remove = catchError(async (req: Request, res: Response) => {
        const {id} = req.params;
        const data:IRestaurant | null = await restaurantServices.remove(id);
        returnRes(res, 200, `Remove ${data!.name} - ${data!.address} successful`)
    })

    get = catchError(async (req: Request, res: Response) => {
        const {address} = req.body;
        const data = await restaurantServices.get(address) ;
        returnRes(res, 200, 'Get data successful', data);
    })
}

export default new RestaurantController();