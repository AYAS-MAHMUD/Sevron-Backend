import { Request, Response } from "express";
import status from "http-status";

import { PatientService } from "./patient.service";
import catchAsync from "../../lib/catchAsync";
import { sendResponse } from "../../lib/sendResponse";
import { IRequestUser } from "../auth/auth.interface";


const updateMyProfile = catchAsync(async (req : Request, res : Response) =>{

    const user = req.user as IRequestUser;
    const payload = req.body;

    const result = await PatientService.updateMyProfile(user, payload);

    sendResponse(res, {
        success: true,
        statusCode : status.OK,
        message : "Profile updated successfully",
        data : result
    });
})

export const PatientController = {
    updateMyProfile
}