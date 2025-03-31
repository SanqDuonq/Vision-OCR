import multer from "multer";

const storage = multer.memoryStorage();

const uploadGoogle = multer({storage});

export default uploadGoogle;