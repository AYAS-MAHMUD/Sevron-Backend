import { Request, Response } from "express";
import { userService } from "./user.service";




const userCreate = async ( req : Request, res : Response) =>{
    try {

        const result = await userService.userCreate(req.body);


        res.status(201).json({
            success : true,
            message : "User created successfully",
            data : result
        })


    } catch (error) {
        console.error(error)
    }
}


export const userController = {
    userCreate,
}