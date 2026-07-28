import { Router } from "express";
import { specilityController } from "./speciality.controller";



const router = Router() ;

router.post("/",specilityController.createSpeciality);
router.get("/",specilityController.getSpeciality);



export const specialityRouter = router ;
