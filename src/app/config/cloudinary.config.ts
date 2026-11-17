import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { config } from "./config";
import { AppError } from "../errorHelper/AppError";

import status from "http-status";

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

export const uploadFileToCloudinary = async (
    buffer : Buffer,
    fileName: string,
) : Promise<UploadApiResponse> =>{

    if(!buffer || !fileName) {
        throw new AppError(status.BAD_REQUEST, "File buffer and file name are required for upload");
    }

    const extension = fileName.split(".").pop()?.toLocaleLowerCase();

    const fileNameWithoutExtension = fileName
        .split(".")
        .slice(0, -1)
        .join(".")
        .toLowerCase()
        .replace(/\s+/g, "-")
        // eslint-disable-next-line no-useless-escape
        .replace(/[^a-z0-9\-]/g, "");

    const uniqueName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileNameWithoutExtension;

    const folder = extension === "pdf" ? "pdfs" : "images";


    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                public_id: `ph-healthcare/${folder}/${uniqueName}`,
                folder : `ph-healthcare/${folder}`,
            },
            (error, result) => {
                if(error){
                    return reject(new AppError(status.INTERNAL_SERVER_ERROR, "Failed to upload file to Cloudinary"));
                }
                resolve(result as UploadApiResponse);
            }
        ).end(buffer);
    })


}


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