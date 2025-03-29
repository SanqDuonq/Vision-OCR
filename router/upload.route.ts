import express from 'express';
import upload from '../middleware/upload.middleware';
import uploadController from '../controller/upload.controllers';

const router = express.Router();

router.post('/single',upload.single('image'), uploadController.single);

export default router;