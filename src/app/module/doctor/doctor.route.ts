import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";
import validationRequest from "../../middleware/validateRequest";
import { updateDoctorValidationSchema } from "./doctor.validation";



const router = Router() ;

router.get("/all-doctor",authCheck(Role.DOCTOR) ,doctorController.getAllDoctors)
router.get("/:id",doctorController.getDoctorById);
router.patch("/:id",validationRequest(updateDoctorValidationSchema),doctorController.updateDoctorBYId);
// router.get("/:id",doctorController.deleteDoctor) // soft delete

export const doctorRouter = router ;
