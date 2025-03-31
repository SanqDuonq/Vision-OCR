import {Request, Response} from 'express'
import ocrService from '../services/ocr.services';

class OcrController {
    async ocr(req: Request, res: Response) {
        if (!req.file) {
            res.status(400).json({ message: "Image is missing" });
            return;
        }
        
        try {
            const text = await ocrService.decodeImage(req.file.buffer);
            if (!text) {
                res.status(400).json({ error: "No text detected" });
                return;
            }
    
            const preprocessedText = text
                .replace(/\|/g, ' ')
                .replace(/[\]\[}{]/g, ' ') 
                .replace(/(\r\n|\n|\r)/gm, '\n');
    
            const destinationRegex = /(?:NOI\s*DEN\/TO|TO|Đến|Điểm\s*đến|Nơi\s*đến)[\s:;|]*\n+([^(]+)/i;
            const match = preprocessedText.match(destinationRegex);
            
            if (match && match[1]) {
                let destination = match[1]
                    .split('(')[0] 
                    .replace(/[^A-Za-zÀ-ỹ\s]/g, '') 
                    .replace(/\s{2,}/g, ' ')
                    .trim();
    
                res.status(200).json({
                    text: text,
                    data: destination || null
                });
                return;
            }
    
            res.status(400).json({
                text: text,
                data: null
            });
    
        } catch (error) {
            console.error("OCR Error:", error);
            res.status(500).json({ error: "Error processing image" });
        }
    }
}

export default new OcrController();