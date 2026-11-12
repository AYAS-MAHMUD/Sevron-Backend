import { Request, Response } from "express";
import catchAsync from "../../lib/catchAsync";
import { sendResponse } from "../../lib/sendResponse";
import { scheduleService } from "./schedule.service";

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.getAllSchedules(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All schedule retrive successfully",
    data: result,
  });
});

const getSchedulesById = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.getSchedulesById();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single schedule retrive successfully",
    data: result,
  });
});

const createSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.createSchedules();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule post successfully",
    data: result,
  });
});
const updateSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.updateSchedules();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule update successfully",
    data: result,
  });
});

const deleteSchedules = catchAsync(async (req: Request, res: Response) => {

  const result = await scheduleService.deleteSchedules();

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
