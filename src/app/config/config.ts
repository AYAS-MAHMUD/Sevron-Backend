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
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CLIENT_ID",
  "FRONTEND_URL",
  "GOOGLE_CALLBACK_URL",
  "BETTER_AUTH_URL",
  "BETTER_AUTH_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
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
  better_auth_url: process.env.BETTER_AUTH_URL,
  frontend_url: process.env.FRONTEND_URL,
  better_auth_secret: process.env.BETTER_AUTH_SECRET,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    smtp_user: process.env.SMTP_USER,
    smtp_pass: process.env.SMTP_PASS,
    smtp_from: process.env.SMTP_FROM,
  },
  google: {
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    frontend_url: process.env.FRONTEND_URL,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL,
  },
  cloudinary: {
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  },
});
