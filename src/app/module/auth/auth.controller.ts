import { Request, Response } from "express";
import catchAsync from "../../lib/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../lib/sendResponse";
import {
  setAccessTokenCookie,
  setBetterAuthSessionCookie,
  setRefreshTokenCookie,
} from "../../lib/token";
import { config } from "../../config/config";
import { auth } from "../../lib/auth";

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
  const betterAuthToken = req.cookies["better-auth.session_token"];
  const result = await authService.logoutUser(betterAuthToken);
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
    data: result,
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
  setAccessTokenCookie(res, result.accessToken);
  setRefreshTokenCookie(res, result.refreshToken);
  setBetterAuthSessionCookie(res, result.sessionToken);

  sendResponse(res, {
    statusCode: 200,
    message: "User Login successfully",
    success: true,
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const sessionToken = req.cookies["better-auth.session_token"];
  const { oldPassword, newPassword } = req.body;

  const result = await authService.changePassword(
    sessionToken,
    oldPassword,
    newPassword,
  );
  const { accessToken, refreshToken, token } = result;
  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);
  setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    statusCode: 200,
    message: "Password changed successfully",
    success: true,
    data: result,
  });
});

const verifyEmailOTP = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  await authService.verifyEmailOTP(email, otp);

  sendResponse(res, {
    statusCode: 200,
    message: "Email verified successfully",
    success: true,
    data: null,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  await authService.forgotPassword(email);

  sendResponse(res, {
    statusCode: 200,
    message: "Password reset email sent successfully",
    success: true,
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  await authService.resetPassword(email, otp, newPassword);

  sendResponse(res, {
    statusCode: 200,
    message: "Password reset email sent successfully",
    success: true,
    data: null,
  });
});

// const sendanyEmail = catchAsync(async (req: Request, res: Response) => {

//   const {otp , email , name} = req.body ;
//   await authService.sendanyEmail(otp , email , name);

//   sendResponse(res, {
//     statusCode: 200,
//     message: "Fake email sent successfully",
//     success: true,
//     data : null

//   });
// });

const googleLogin = catchAsync(
  // /api/auth/login/google?redirect=/profile
  async (req: Request, res: Response) => {
    const redirectUrl = req.query.redirect || "/profile";
    const encodedRedirectUrl = encodeURIComponent(redirectUrl as string);
    const callbackURL = `${config.better_auth_url}/api/v1/auth/google/success?redirect=${encodedRedirectUrl}`;

    res.render("googleRedirect", {
      callbackURL: callbackURL,
      betterAuthUrl: config.better_auth_url,
    });
  },
);

const googleLoginSuccess = catchAsync(async (req: Request, res: Response) => {
  const redirectUrl = req.query.redirect as string || "/profile";

  const sessionToken = req.cookies["better-auth.session_token"];

  if (!sessionToken) {
    return res.redirect(`${config.frontend_url}/login?error=oauth_failed`);
  }
  const session = await auth.api.getSession({
    headers: {
      Cookie: `better-auth.session_token=${sessionToken``}`,
    },
  });

  if (session && !session.user) {
    return res.redirect(`${config.frontend_url}/login?error=No_user_found`);
  }
  if (!session) {
    return res.redirect(`${config.frontend_url}/login?error=No_session_found`);
  }

  const  result = await authService.googleLoginSuccess(session);
  const { accessToken, refreshToken } = result;

  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);

  const isValidRedirectUrl = redirectUrl.startsWith("/") && !redirectUrl.startsWith("//");
  const finalRedirectUrl = isValidRedirectUrl ? redirectUrl : "/dashboard";
  
  res.redirect(`${config.frontend_url}${finalRedirectUrl}`);

});
const handleOAuthError = catchAsync(async (req: Request, res: Response) => {
  const error = req.query.error as string || "oauth_failed" ;
  res.redirect(`${config.frontend_url}/login?error=${error}`)
});

export const authController = {
  registerPatient,
  loginUser,
  getMe,
  logoutUser,
  getNewToken,
  changePassword,
  verifyEmailOTP,
  forgotPassword,
  resetPassword,
  googleLogin,
  googleLoginSuccess,
  handleOAuthError,
  // sendanyEmail
};
