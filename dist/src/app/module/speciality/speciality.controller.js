import catchAsync from "../../lib/catchAsync";
import { specialityService } from "./speciality.service";
import { sendResponse } from "../../lib/sendResponse";
const createSpeciality = catchAsync(async (req, res) => {
    const payload = {
        ...req.body,
        icon: req.file?.path
    };
    // throw new Error("Test error");
    const result = await specialityService.createSpeciality(payload);
    sendResponse(res, {
        statusCode: 201,
        message: "Speciality created",
        success: true,
        data: result
    });
});
const getSpeciality = catchAsync(async (req, res) => {
    const result = await specialityService.getSpeciality();
    sendResponse(res, {
        statusCode: 200,
        message: "Speciality retrieved successfully",
        success: true,
        data: result
    });
});
const deleteSpeciality = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await specialityService.deleteSpeciality(id);
    sendResponse(res, {
        statusCode: 200,
        message: "Speciality deleted successfully",
        success: true,
        data: result
    });
});
const updateSpeciality = catchAsync(async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const result = await specialityService.updateSpeciality(id, body);
    sendResponse(res, {
        statusCode: 200,
        message: "Speciality updated successfully",
        success: true,
        data: result
    });
});
export const specilityController = {
    createSpeciality,
    getSpeciality,
    deleteSpeciality,
    updateSpeciality
};
