import { catchError } from "../middleware/catch-error.middleware";
import {Request, Response} from 'express'
import returnRes from "../utils/return-response";
import uploadServices from "../services/upload.services";


class UploadController {
    single = catchError(async (req: Request, res: Response) => {
        const url = await uploadServices.uploadSingle(req.file?.path!);
        returnRes(res, 200, 'Upload single successful', url);
    })
}

export default new UploadController();

