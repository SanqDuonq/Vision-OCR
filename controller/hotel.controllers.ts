import { catchError } from "../middleware/catch-error.middleware";

class HotelController {
    add = catchError(async (req: Request, res: Response) => {

    })

    edit = catchError(async (req: Request, res: Response) => {
        
    })

    remove = catchError(async (req: Request, res: Response) => {
        
    })

    get = catchError(async (req: Request, res: Response) => {
        
    })
}

export default new HotelController();