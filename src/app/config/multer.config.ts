import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";
import multer from "multer";




const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,

  params: {
    // hello image.png
    public_id: (req, file) => {
      const fileName = file.originalname
        .split(".")[0]
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const uniqueFileName =
        Math.random().toString(36).substring(2, 8) +
        "-" +
        Date.now() +
        "-" +
        fileName;

      return uniqueFileName;
    },
  },
});



export const multerUpload = multer({storage})