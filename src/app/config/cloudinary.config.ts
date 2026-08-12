import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";
import { AppError } from "../errorHelper/AppError";

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});



export const deleteImageFromCloudinary = async (url : string) =>{
  const match = url.match(/\/([^/]+)\.[^/.]+$/);

// console.log(match?.[1]);
if(match && match[1]){
  const publicId = match[1];
  try {
    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type : "image"
      }
    );
    console.log(`Image with public ID ${publicId} deleted successfully.`);
  }
  catch (error){
    console.error(`Error deleting image with public ID ${publicId}:`,error);
    throw new AppError(500,"Failed to delete image from cloudinary");
  }

}

}

export const cloudinaryUpload = cloudinary;