import { Router } from "express";
import { specilityController } from "./speciality.controller";



const router = Router() ;

router.post("/",specilityController.createSpeciality);



export const specialityRouter = router ;
