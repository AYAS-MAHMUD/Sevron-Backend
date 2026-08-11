import { Request, Response } from "express";
import catchAsync from "../../lib/catchAsync";
import { specialityService } from "./speciality.service";
import { sendResponse } from "../../lib/sendResponse";



const createSpeciality = catchAsync(
    async(req : Request , res : Response) => {

          const payload = {
            ...req.body,
            icon : req.file?.path
          }

        const result = await specialityService.createSpeciality(payload) ;

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
            statusCode : 200,
            message : "Speciality retrieved successfully",
            success : true,
            data : result
        })
    }  
)



const deleteSpeciality = catchAsync(
    async(req : Request , res : Response) => {
        const {id} = req.params;

        const result = await specialityService.deleteSpeciality(id as string) ;

        sendResponse(res,{
            statusCode : 200,
            message : "Speciality deleted successfully",
            success : true,
            data : result
        })
    }  
)



const updateSpeciality = catchAsync(
    async(req : Request , res : Response) => {
        const {id} = req.params;
        const body = req.body;
        const result = await specialityService.updateSpeciality(id as string, body) ;

        sendResponse(res,{
            statusCode : 200,
            message : "Speciality updated successfully",
            success : true,
            data : result
        })
    }  
)


export const specilityController = {
    createSpeciality,
    getSpeciality,
    deleteSpeciality,
    updateSpeciality
}