// res.cookie('refreshToken', userToken.refreshToken, {
//         httpOnly: true,
//         secure: config.node_env==="production",
//         sameSite : "none"
//       });



import { CookieOptions, Request, Response } from "express";

const setCookie = (res: Response, key: string, value: string, options: CookieOptions) => {
    res.cookie(key, value, options);
}

const getCookie = (req: Request, key: string) => {
    return req.cookies[key];
}

const clearCookie = (res: Response, key: string, options: CookieOptions) => {
    res.clearCookie(key, options);
}

export const CookieUtils = {
    setCookie,
    getCookie,
    clearCookie,
}