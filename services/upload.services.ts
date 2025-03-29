import {v2 as cloudinary} from 'cloudinary';

class UploadServices {
    async uploadSingle(image: string) {
        const url = await cloudinary.uploader.upload(image,{
            folder: 'upload-image-users'
        })
        return url.secure_url;
    }
}

export default new UploadServices();