import catchAsync from "../../lib/catchAsync";
import { adminService } from "./admin.service";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../lib/sendResponse";
const getAllAdmins = catchAsync(async (req, res) => {
    const result = await adminService.getAllAdmins();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "All admin retrived successfully",
        data: result,
    });
});
const getAdminById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.getAdminById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "admin retrived successfully",
        data: result,
    });
});
const updateAdminById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.updateAdminById(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "admin updated successfully",
        data: result,
    });
});
const softDeleteAdminById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await adminService.softDeleteAdminById(id, user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "admin deleted successfully",
        data: result,
    });
});
export const adminController = {
    getAllAdmins,
    getAdminById,
    updateAdminById,
    softDeleteAdminById,
};
