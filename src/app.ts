import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import router from "./app/router/router";
import { notFound } from "./app/lib/notFound";
import globalErrorHandler from "./app/lib/globalErrorhandler";

const app: Application = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hospital Management API Running Successfully",
  });
});

// api routes
app.use("/api/v1", router);

// not found route
app.use(notFound)


// global error handler
// app.use(globalErrorHandler)

export default app;