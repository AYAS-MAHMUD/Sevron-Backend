import { Router } from "express";
import { authController } from "./auth.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";


const router = Router();


router.post("/register",authController.registerPatient);
router.post("/login",authController.loginUser);
router.get("/me",authCheck(...Object.values(Role)),authController.getMe)
export const authRouter = router ;
