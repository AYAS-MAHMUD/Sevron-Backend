
import dotenv from "dotenv";
import path from "path";
import { AppError } from "../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";

dotenv.config({path: path.join(process.cwd(), ".env"),});

const requiredEnv = [
  "PORT",
  "DATABASE_URL",
] as const;

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR,`Missing environment variable: ${key}`);
  }
});

export const config = Object.freeze({
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL!,
});