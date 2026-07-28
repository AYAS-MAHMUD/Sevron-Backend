import { Request, Response } from "express";
import catchAsync from "../../lib/catchAsync";
import { specialityService } from "./speciality.service";
import { sendResponse } from "../../lib/sendResponse";



const createSpeciality = catchAsync(
    async(req : Request , res : Response) => {
        const body = req.body ;
        const result = await specialityService.createSpeciality(body) ;

        sendResponse(res,{
            statusCode : 201,
            message : "Speciality created",
            success : true,
            data : result
        })
    }  
)


const getSpeciality = catchAsync(
    async(req : Request , res : Response) => {

        const result = await specialityService.getSpeciality() ;

        sendResponse(res,{
            statusCode : 201,
            message : "Speciality retrieved successfully",
            success : true,
            data : result
        })
    }  
)


export const specilityController = {
    createSpeciality,
    getSpeciality,

}