import VisionGoogle from "../utils/google-vision";

class OcrService {
    async decodeImage(image: Buffer) {
        const [result] = await VisionGoogle.textDetection(image);
        const detection = result.textAnnotations;
        if (!detection || detection.length === 0 || !detection[0]) {
            throw new Error('No text in image');
        }
        return detection[0].description;
    }
}

export default new OcrService();