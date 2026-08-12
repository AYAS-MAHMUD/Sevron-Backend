import { Router } from "express";
import { specilityController } from "./speciality.controller";
import { multerUpload } from "../../config/multer.config";
import validationRequest from "../../middleware/validateRequest";
import { createSpecialtySchema } from "./speciality.validation";



const router = Router() ;

router.post("/",multerUpload.array("files"),validationRequest(createSpecialtySchema),specilityController.createSpeciality);
router.get("/",specilityController.getSpeciality);

router.delete("/:id",specilityController.deleteSpeciality);
router.put("/:id",specilityController.updateSpeciality);



export const specialityRouter = router ;
