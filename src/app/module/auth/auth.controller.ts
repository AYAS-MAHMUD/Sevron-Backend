import { Request, Response } from "express";
import catchAsync from "../../lib/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../lib/sendResponse";
import {
  setAccessTokenCookie,
  setBetterAuthSessionCookie,
  setRefreshTokenCookie,
} from "../../lib/token";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authService.registerPatient(body);
  const { accessToken, refreshToken } = result;

  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, {
    statusCode: 201,
    message: "User register successfully",
    success: true,
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const body = req.user;
  const result = await authService.getMe(body);

  sendResponse(res, {
    statusCode: 200,
    message: "User profile retrieved successfully",
    success: true,
    data: result,
  });
});
const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("better-auth.session_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: 200,
    message: "User Login successfully",
    success: true,
    data: null,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authService.loginUser(body);
  const { accessToken, refreshToken, sessionToken } = result;

  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);
  setBetterAuthSessionCookie(res, sessionToken);

  sendResponse(res, {
    statusCode: 200,
    message: "User Login successfully",
    success: true,
    data: result,
  });
});


const getNewToken = catchAsync(async (req: Request, res: Response) => {


    const refreshToken = req.cookies.refreshToken;
    const betterAuthToken = req.cookies["better-auth.session_token"];

    const result = await authService.getNewToken(refreshToken, betterAuthToken);
    setAccessTokenCookie(res , result.accessToken);
    setRefreshTokenCookie(res , result.refreshToken);
    setBetterAuthSessionCookie(res , result.sessionToken);

  sendResponse(res, {
    statusCode: 200,
    message: "User Login successfully",
    success: true,
    data: result,
  });
});

export const authController = {
  registerPatient,
  loginUser,
  getMe,
  logoutUser,
  getNewToken
};
