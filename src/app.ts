import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import router from "./app/router/router";
import { notFound } from "./app/lib/notFound";
import globalErrorHandler from "./app/lib/globalErrorhandler";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "path";

const app: Application = express();

app.use("/api/auth",toNodeHandler(auth))


app.set("view engine","ejs");
app.set("views",path.resolve(process.cwd() ,`src/app/templates`))

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
app.use(globalErrorHandler)

export default app;