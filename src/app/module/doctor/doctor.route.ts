import { Router } from "express";
import { doctorController } from "./doctor.controller";



const router = Router() ;

router.get("/" , doctorController.getAllDoctors)
// router.get("/:id",doctorController.getDoctorById)
// router.get("/:id",doctorController.updateDoctor)
// router.get("/:id",doctorController.deleteDoctor) // soft delete

export const doctorRouter = router ;
