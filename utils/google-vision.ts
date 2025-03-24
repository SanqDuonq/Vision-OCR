import vision from '@google-cloud/vision';
import path from 'path';

const VisionGoogle = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, '../service-account.json')
})

export default VisionGoogle;