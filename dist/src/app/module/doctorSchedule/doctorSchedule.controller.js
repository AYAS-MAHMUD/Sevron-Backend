import catchAsync from "../../lib/catchAsync";
import { sendResponse } from "../../lib/sendResponse";
import httpStatus from "http-status";
import { DoctorScheduleService } from "./doctorSchedule.service";
const createMyDoctorSchedule = catchAsync(async (req, res) => {
    const payload = req.body;
    const user = req.user;
    const doctorSchedule = await DoctorScheduleService.createMyDoctorSchedule(user, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Doctor schedule created successfully',
        data: doctorSchedule
    });
});
const getMyDoctorSchedules = catchAsync(async (req, res) => {
    const user = req.user;
    const query = req.query;
    const result = await DoctorScheduleService.getMyDoctorSchedules(user, query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Doctor schedules retrieved successfully',
        data: "",
    });
});
const getAllDoctorSchedules = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await DoctorScheduleService.getAllDoctorSchedules(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'All doctor schedules retrieved successfully',
        data: ""
    });
});
const getDoctorScheduleById = catchAsync(async (req, res) => {
    const doctorId = req.params.doctorId;
    const scheduleId = req.params.scheduleId;
    const doctorSchedule = await DoctorScheduleService.getDoctorScheduleById(doctorId, scheduleId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Doctor schedule retrieved successfully',
        data: doctorSchedule
    });
});
const updateMyDoctorSchedule = catchAsync(async (req, res) => {
    const payload = req.body;
    const user = req.user;
    const updatedDoctorSchedule = await DoctorScheduleService.updateMyDoctorSchedule(user, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Doctor schedule updated successfully',
        data: updatedDoctorSchedule
    });
});
const deleteMyDoctorSchedule = catchAsync(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    await DoctorScheduleService.deleteMyDoctorSchedule(id, user);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Doctor schedule deleted successfully',
        data: ""
    });
});
export const DoctorScheduleController = {
    createMyDoctorSchedule,
    getMyDoctorSchedules,
    getAllDoctorSchedules,
    getDoctorScheduleById,
    updateMyDoctorSchedule,
    deleteMyDoctorSchedule
};
