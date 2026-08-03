import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../lib/catchAsync";
import { sendResponse } from "../../lib/sendResponse";
import { StatusCodes } from "http-status-codes";
import { config } from "../../config/config";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  console.log("Doctor : ", body);
  const result = await userService.createDoctor(body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  const result = await userService.createAdmin(body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

// const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
//   const email = config.SUPER_ADMIN_EMAIL as string;
//   const password = config.SUPER_ADMIN_PASSWORD as string;
//   const result = await userService.createSuperAdmin({ email, password });

//   sendResponse(res, {
//     statusCode: StatusCodes.CREATED,
//     success: true,
//     message: "Super Admin created successfully",
//     data: result,
//   });
// });

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All User retrieved successfully",
    data: result,
  });
});

export const userController = {
  createDoctor,
  getAllUser,
  createAdmin,
//   createSuperAdmin
};
