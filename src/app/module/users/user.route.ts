import { Router } from "express";
import { userController } from "./user.controller";
import validationRequest from "../../middleware/validateRequest";
import { createAdminZodSchema, createDoctorSchema } from "./user.validation";


const router = Router()


router.post("/create-doctor",validationRequest(createDoctorSchema),userController.createDoctor);
router.post("/create-admin" , validationRequest(createAdminZodSchema),userController.createAdmin);
// router.post("/create-super-admin",validationRequest(),userController.createSuperAdmin);
router.get("/all-users",userController.getAllUser);

export const userRouter = router