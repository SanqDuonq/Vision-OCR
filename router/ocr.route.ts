import express from 'express';
import ocrController from '../controller/ocr.controllers';
import uploadGoogle from '../middleware/upload-google.middleware';
import middleware from '../middleware/jwt.middleware';

const router = express.Router();

router.post('/scan',middleware.verifyToken, uploadGoogle.single('image'), ocrController.ocr);

export default router;