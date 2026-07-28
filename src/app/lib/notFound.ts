import { Request, Response } from "express";


export const notFound = (req: Request, res : Response)=>{
    res.status(404).json({
        success : false,
        message : "API NOT FOUND",
        error : {
            path : req.originalUrl,
            message : "Your requested path is't FOUND"
        }
    })
}