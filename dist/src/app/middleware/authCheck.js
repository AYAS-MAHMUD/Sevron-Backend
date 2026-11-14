import { AppError } from "../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
export const authCheck = (...rules) => async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        console.log(accessToken);
        if (!accessToken) {
            throw new AppError(StatusCodes.NOT_FOUND, "Access Token not found");
        }
        const verifiedToken = jwt.verify(accessToken, config.JWT_ACCESS_SECRET);
        if (!rules.includes(verifiedToken.role)) {
            throw new AppError(StatusCodes.FORBIDDEN, "Unauthorized Access");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        next(error);
    }
};
