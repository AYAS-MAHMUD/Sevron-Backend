import { JwtPayload, SignOptions } from "jsonwebtoken"
import { config } from "../config/config"
import { generateToken } from "./jwt"


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