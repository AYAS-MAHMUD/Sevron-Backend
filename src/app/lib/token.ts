import { JwtPayload, SignOptions } from "jsonwebtoken"
import { config } from "../config/config"
import { generateToken } from "./jwt"
import { CookieUtils } from "./cookie";
import { Response } from "express";


export const UserTokens = (user: JwtPayload) => {
  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );
  const refreshToken = generateToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
  );



  return { accessToken, refreshToken };
};



// export const setAccessTokenCookie = (res : Response , token : string) =>{
//     CookieUtils.setCookie(res,"accessToken", token , {
//         httpOnly : true,
//         secure : true,
//         sameSite : "none",
//         maxAge : 60 * 60 * 60 * 24
//     })
// }
// export const setRefreshTokenCookie = (res : Response , token : string) =>{
//     CookieUtils.setCookie(res,"refreshToken", token , {
//         httpOnly : true,
//         secure : true,
//         sameSite : "none",
//         maxAge : 60 * 60 * 60 * 24
//     })
// }