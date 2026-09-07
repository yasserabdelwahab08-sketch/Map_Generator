import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "uploads",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  }, 
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5*1024*1024, // max size is 5 MB
    }
})

export default upload;