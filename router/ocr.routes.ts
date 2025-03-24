import express from 'express';
import upload from '../middleware/upload.middleware';
import ocrController from '../controller/ocr.controller';

const router = express.Router();

router.post('/ocr', upload.single('image'), ocrController.ocr);

export default router;