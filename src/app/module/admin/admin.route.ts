import { Router } from "express";
import { adminController } from "./admin.controller";




const router = Router() ;



router.get("/all-admins",adminController.getAllAdmins)


router.get("/:id",adminController.getAdminById)

// router.patch("/all-admins",adminController.getAllAdmins)
// router.delete("/all-admins",adminController.getAllAdmins)
  
export const AdminRoute = router ; 
