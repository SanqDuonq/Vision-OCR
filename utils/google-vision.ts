import vision from '@google-cloud/vision';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const VisionGoogle = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, process.env.GOOGLE_SERVICE_ACCOUNT_JSON!)
})

export default VisionGoogle;