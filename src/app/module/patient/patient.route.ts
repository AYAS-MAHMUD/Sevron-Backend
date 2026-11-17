import { Router } from "express";
import { authCheck } from "../../middleware/authCheck";
import { multerUpload } from "../../config/multer.config";
import validationRequest from "../../middleware/validateRequest";
import { PatientValidation } from "./patient.validation";
import { PatientController } from "./patient.controller";
import { Role } from "../../../generated/prisma/enums";
import { updateMyPatientProfileMiddleware } from "./patient.middleware";

const router = Router();

router.patch("/update-my-profile",
    authCheck(Role.PATIENT),
    multerUpload.fields([
        { name : "profilePhoto", maxCount : 1},
        { name : "medicalReports", maxCount : 5}
    ]), 
    updateMyPatientProfileMiddleware,
    validationRequest(PatientValidation.updatePatientProfileZodSchema),
    PatientController.updateMyProfile
)

export const PatientRoutes = router;