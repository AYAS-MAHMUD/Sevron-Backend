import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";
import validationRequest from "../../middleware/validateRequest";
import { updateDoctorValidationSchema } from "./doctor.validation";



const router = Router() ;

router.get("/all-doctor",authCheck(Role.ADMIN, Role.SUPER_ADMIN) ,doctorController.getAllDoctors)
router.get("/:id",authCheck(Role.ADMIN, Role.SUPER_ADMIN),doctorController.getDoctorById);
router.patch("/:id",authCheck(Role.ADMIN, Role.SUPER_ADMIN),validationRequest(updateDoctorValidationSchema),doctorController.updateDoctorBYId);
router.delete("/:id",authCheck(Role.ADMIN, Role.SUPER_ADMIN),doctorController.softDeleteDoctorById) // soft delete

export const doctorRouter = router ;
