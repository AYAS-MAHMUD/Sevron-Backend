

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { Prisma } from "../../generated/prisma/client";
import { config } from "../config/config";
import { deleteImageFromCloudinary } from "../config/cloudinary.config";

const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {


  if(config.NODE_ENV == "development"){
    console.log( )
  }

  // if there is a file uploaded error occurs, then delete the file from cloudinary
  if(req.file){
    await deleteImageFromCloudinary(req.file?.path);
  }

  let statusCode: number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong!";
  let error = err;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      ((message = "Duplicate key error"),
        (error = err.meta),
        (statusCode = httpStatus.CONFLICT));
    }
    if (err.code === "P1000") {
      ((message = "Authentication failed against database server"),
        (error = err.meta),
        (statusCode = httpStatus.BAD_GATEWAY));
    }
    if (err.code === "P2003") {
      ((message = "Foreign key constraint failed"),
        (error = err.meta),
        (statusCode = httpStatus.BAD_REQUEST));
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    ((message = "Validation Error"),
      (error = err.message),
      (statusCode = httpStatus.BAD_REQUEST));
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    ((message = "Unknown Prisma error occured!"),
      (error = err.message),
      (statusCode = httpStatus.BAD_REQUEST));
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    ((message = "Prisma client failed to initialize!"),
      (error = err.message),
      (statusCode = httpStatus.BAD_REQUEST));
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: {
      path: req.originalUrl,
      method: req.method,
    },
  });
};

export default globalErrorHandler;
