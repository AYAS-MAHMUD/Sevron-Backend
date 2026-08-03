import { Request, Response } from "express";
import catchAsync from "../../lib/catchAsync";
import { doctorService } from "./doctor.service";
import { sendResponse } from "../../lib/sendResponse";
import { StatusCodes } from "http-status-codes";


const getAllDoctors = catchAsync(
    async(req : Request , res : Response) =>{

        const result = await doctorService.getAllDoctors() ; 

        sendResponse(res , {
            statusCode : StatusCodes.OK,
            success : true ,
            message : "Doctor Retrieved successfully",
            data : result
        })
    }
)


const getDoctorById = catchAsync(
    async(req : Request , res : Response) =>{
        const {id} = req.params;
        const result = await doctorService.getDoctorById(id as string) ; 

        sendResponse(res , {
            statusCode : StatusCodes.OK,
            success : true ,
            message : "Doctor Retrieved successfully",
            data : result
        })
    }
)


const updateDoctorBYId = catchAsync(
    async(req : Request , res : Response) =>{
        const {id} = req.params;
        const body = req.body;

        const result = await doctorService.updateDoctorBYId(id as string , body) ; 

        sendResponse(res , {
            statusCode : StatusCodes.OK,
            success : true ,
            message : "Doctor Updated successfully",
            data : result
        })
    }
)


const softDeleteDoctorById = catchAsync(
    async(req : Request , res : Response) =>{
        const {id} = req.params;

        const result = await doctorService.softDeleteDoctorById(id as string ) ; 

        sendResponse(res , {
            statusCode : StatusCodes.OK,
            success : true ,
            message : "Doctor Deleted successfully",
            data : result
        })
    }
)

export const doctorController = {
    getAllDoctors,
    getDoctorById,
    updateDoctorBYId,
    softDeleteDoctorById
}