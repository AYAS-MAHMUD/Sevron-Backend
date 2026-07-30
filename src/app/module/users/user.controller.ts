import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../lib/catchAsync";
import { sendResponse } from "../../lib/sendResponse";
import { StatusCodes } from "http-status-codes";




const createDoctor = catchAsync(
    async(req : Request , res : Response) =>{
        const body = req.body ;
        console.log("Doctor : ",body)
        const result = await userService.createDoctor(body) ; 

        sendResponse(res , {
            statusCode : StatusCodes.CREATED,
            success : true ,
            message : "Doctor created successfully",
            data : result
        })
    }
)


export const userController = {
    createDoctor,
}