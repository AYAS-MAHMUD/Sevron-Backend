import catchAsync from "../../lib/catchAsync";
import { sendResponse } from "../../lib/sendResponse";
import { scheduleService } from "./schedule.service";
const createSchedules = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await scheduleService.createSchedules(payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule post successfully",
        data: result,
    });
});
const getAllSchedules = catchAsync(async (req, res) => {
    const result = await scheduleService.getAllSchedules();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All schedule retrive successfully",
        data: result,
    });
});
const getSchedulesById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await scheduleService.getSchedulesById(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Single schedule retrive successfully",
        data: result,
    });
});
const updateSchedules = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await scheduleService.updateSchedules(id, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule update successfully",
        data: result,
    });
});
const deleteSchedules = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await scheduleService.deleteSchedules(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule delete successfully",
        data: result,
    });
});
export const scheduleController = {
    getAllSchedules,
    createSchedules,
    getSchedulesById,
    updateSchedules,
    deleteSchedules,
};
