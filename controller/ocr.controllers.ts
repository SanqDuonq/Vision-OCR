import {Request, Response} from 'express'
import ocrService from '../services/ocr.services';

class OcrController {
    async ocr(req: Request, res: Response) {
        if (!req.file) {
            res.status(400).json({
                message: "Image is missing"
            });
            return;
        }
        try {
            const text = await ocrService.decodeImage(req.file.buffer);
            res.status(200).json({
                text: text
            });
        } catch (error) {
            console.error("OCR Error:", error);
            res.status(500).json({ error: "Error processing image" });
        }
    }
}

export default new OcrController();