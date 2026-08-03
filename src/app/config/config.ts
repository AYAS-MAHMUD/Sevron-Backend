import dotenv from "dotenv";
import path from "path";
import { AppError } from "../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const requiredEnv = [
  "PORT",
  "DATABASE_URL",
  "NODE_ENV",
  "JWT_ACCESS_SECRET",
  "JWT_ACCESS_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES_IN",
  "SUPER_ADMIN_EMAIL",
  "SUPER_ADMIN_PASSWORD",
] as const;

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Missing environment variable: ${key}`,
    );
  }
});

export const config = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
});
