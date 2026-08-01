import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken"
import { config } from "../config/config";


export const authCheck  = (...rules : string[]) =>
    async (req : Request,  res : Response , next : NextFunction) =>{

    try {
        
        const accessToken = req.cookies.accessToken ;
        if(!accessToken){
            throw new AppError(StatusCodes.NOT_FOUND, "Access Token not found")
        }

      const verifiedToken = jwt.verify(
        accessToken,
        config.JWT_ACCESS_SECRET as string,
      );


      if (!rules.includes((verifiedToken as JwtPayload).role)) {
        throw new AppError(StatusCodes.FORBIDDEN, "Unauthorized Access");
      }
 
      req.user = verifiedToken as JwtPayload;


      next()

    } catch (error) {
        next(error)
    }
}