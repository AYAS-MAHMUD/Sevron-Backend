import { Request, Response } from "express";
import catchAsync from "../../lib/catchAsync";
import { sendResponse } from "../../lib/sendResponse";
import { scheduleService } from "./schedule.service";
import { IQueryParams } from "../../interface/query.interface";



const createSchedules = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await scheduleService.createSchedules(payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule post successfully",
    data: result,
  });
});


const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await scheduleService.getAllSchedules(query as IQueryParams);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All schedule retrive successfully",
    data: result,
  });
});

const getSchedulesById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await scheduleService.getSchedulesById(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single schedule retrive successfully",
    data: result,
  });
});



const updateSchedules = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const payload = req.body;

  const result = await scheduleService.updateSchedules(id as string, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule update successfully",
    data: result,
  });
});

const deleteSchedules = catchAsync(async (req: Request, res: Response) => {
  const {id}  = req.params;
  const result = await scheduleService.deleteSchedules(id as string);

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
