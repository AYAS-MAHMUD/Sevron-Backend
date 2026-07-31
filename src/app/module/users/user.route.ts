import { Router } from "express";
import { userController } from "./user.controller";
import validationRequest from "../../middleware/validateRequest";
import { createDoctorSchema } from "./user.validation";


const router = Router()


router.post("/create-doctor",validationRequest(createDoctorSchema),userController.createDoctor)


export const userRouter = router