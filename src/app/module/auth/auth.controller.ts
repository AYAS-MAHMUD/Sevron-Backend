import { Request, Response } from "express";
import catchAsync from "../../lib/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../lib/sendResponse";
import { setAccessTokenCookie, setBetterAuthSessionCookie, setRefreshTokenCookie } from "../../lib/token";



const registerPatient = catchAsync(
    async(req : Request , res : Response) => {

        const body = req.body;
        const result = await authService.registerPatient(body) ;
        const {accessToken , refreshToken} = result ;

        setAccessTokenCookie(res,accessToken);
        setRefreshTokenCookie(res,refreshToken);

        sendResponse(res,{
            statusCode : 201,
            message : "User register successfully",
            success : true,
            data : result
        })
    }  
)



const loginUser = catchAsync(
    async(req : Request , res : Response) => {

        const body = req.body;
        const result = await authService.loginUser(body) ;
        const {accessToken , refreshToken , sessionToken} = result ;

        setAccessTokenCookie(res,accessToken);
        setRefreshTokenCookie(res,refreshToken);
        setBetterAuthSessionCookie(res , sessionToken)
      
        sendResponse(res,{
            statusCode : 200,
            message : "User Login successfully",
            success : true,
            data : result
        })
    }  
)


export const authController = {
    registerPatient,
    loginUser
}