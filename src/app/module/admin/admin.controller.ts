import { Request, Response } from "express";
import catchAsync from "../../lib/catchAsync";
import { adminService } from "./admin.service";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../lib/sendResponse";




const getAllAdmins = catchAsync(
    async(req : Request , res : Response) =>{

        const result = await adminService.getAllAdmins() ; 

        sendResponse(res , {
            statusCode : StatusCodes.OK,
            success : true ,
            message : "All admin retrived successfully",
            data : result
        })
    }
)

const getAdminById = catchAsync(
    async(req : Request , res : Response) =>{

        const { id } = req.params ;
        const result = await adminService.getAdminById(id as string) ; 

        sendResponse(res , {
            statusCode : StatusCodes.OK,
            success : true ,
            message : "admin retrived successfully",
            data : result
        })
    }
)

export const adminController = {
    getAllAdmins,
    getAdminById

}