import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";



const router = Router() ;

router.get("/all-doctor",authCheck(Role.DOCTOR) ,doctorController.getAllDoctors)
router.get("/:id",doctorController.getDoctorById);
// router.get("/:id",doctorController.updateDoctor)
// router.get("/:id",doctorController.deleteDoctor) // soft delete

export const doctorRouter = router ;
